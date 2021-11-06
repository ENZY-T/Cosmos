using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Cosmos.Services;
using Cosmos;
using Cosmos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.Dtos;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using Google.Apis.Auth;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cosmos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;

        public AuthController(IUserService userService, IJwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _userService.GetbyEmail(loginDto.Email);
            if (user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                {
                    string jwt = _jwtService.Generate(_userService.GetbyEmail(user.Email).Id);

                    Response.Cookies.Append("jwt", jwt, new CookieOptions()
                    {
                        HttpOnly = true
                    });

                    // Returning Status OK with the logged user details
                    return Ok(new LoggedUserDto() { UserId = user.Id, Email = user.Email, FName = user.FName, LName = user.LName });
                }
                else
                {
                    return BadRequest(error: new { message = "Invalid Credentials" });
                }
            }
            else
            {
                return BadRequest(error: new { message = "Invalid Credentials" });
            }
        }

        // POST api/<AuthController>/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto registerDto)
        {
            UserModel newUser = new UserModel
            {
                Email = registerDto.Email,
                FName = registerDto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };
            var user = _userService.Create(newUser);
            if (user == null)
            {
                return BadRequest(error: new { message = "Email already in use" });
            }
            else
            {
                return Created("Success", user);

            }
        }


        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                string UserId = token.Issuer;

                var user = _userService.GetbyId(UserId);

                return Ok(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Success" });
        }

        #region Third party logind
        [HttpPost("google")]
        public async Task<IActionResult> GoogleSignInAsync([FromQuery] string token)
        {
            Payload payload = new Payload();
            try
            {
                payload = await ValidateAsync(token, new ValidationSettings
                {
                    Audience = new[]
                    {
                        //Environment.GetEnvironmentVariable("CLIENT_ID") // To Get Client ID from LaunchSettings.json... Configure it to get from appsettings.json. Otherwise not working after publishing
                        "739532960944-v3n8196hltf8hfnilr25nai2fkibeqh9.apps.googleusercontent.com" //Not better. Code to get this from appsettings.json
                    }
                });
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            var result = _userService.ThirdPartySignIn(new UserModel
            {
                FName=payload.Name.Split(' ').First(),
                LName=payload.Name.Split(' ').LastOrDefault(),
                Email = payload.Email,
                ExternalId = payload.Subject,
                ExternalType = "GOOGLE"
            });

            var jwtToken = _jwtService.Generate(result.Id);
            Response.Cookies.Append("jwt", jwtToken);
            return Ok(new LoggedUserDto() { UserId = result.Id, Email = result.Email, FName = result.FName, LName = result.LName });
        }
        #endregion
    }
}
