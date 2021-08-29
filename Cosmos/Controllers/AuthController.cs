using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Cosmos.Services;
using CosmosLib;
using CosmosLib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

                    return Ok(new { message = "Success" });
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
            }else
            { 
                return Created(uri: "Success", value: user);

            }
        }

        [HttpGet("user")]
        public IActionResult User()
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

    }
}
