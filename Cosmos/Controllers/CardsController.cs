
using Cosmos;
using Cosmos.Models;
using Cosmos.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cosmos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly ICardService cardService;

        public CardsController(ICardService cardService)
        {
            this.cardService = cardService;
        }

        #region GET Method
        // GET: api/Cards
        [HttpGet("projects")]
        public IActionResult GetProjects()
        {
            List<AdminItemModel> projList = cardService.GetProjAll();
            if (projList != null)
            {
                return Ok(projList);
            }
            else
            {
                Response.Headers.Add("Messsage", "Data not found");
                return NotFound();
            }
        }

        // GET: api/Cards
        [HttpGet("articles")]
        public IActionResult GetArticles()
        {
            List<AdminItemModel> articleList = cardService.GetArticleAll();
            if (articleList != null)
            {
                return Ok(articleList);
            }
            else
            {
                Response.Headers.Add("Messsage", "Data not found");
                return NotFound();
            }
        }
        #endregion

        // GET api/Cards/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        #region POST Methods
        // POST api/Cards
        [HttpPost("projects")]
        public IActionResult CreateProject([FromBody] ProjectModel_Full newProject)
        {
            var status = cardService.CreateProj(newProject);
            if (status)
            {
                return Created("Saved",newProject);
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }

        // POST api/Cards
        [HttpPost("articles")]
        public IActionResult CreateArticle([FromBody] ArticleModel_Full newProject)
        {
            var status = cardService.CreateArticle(newProject);
            if (status)
            {
                return Created("Saved", newProject);
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }
        #endregion
        // PUT api/Cards/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Cards/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
