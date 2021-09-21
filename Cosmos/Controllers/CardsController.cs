
using Cosmos;
using Cosmos.Models;
using Cosmos.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
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
    [RequestSizeLimit(104857600)] //100MB Max HTTP content limit
    public class CardsController : ControllerBase
    {
        #region Initialization
        private readonly ICardService cardService;
        private readonly IFileService fileService;
        private readonly IWebHostEnvironment env;

        public CardsController(ICardService cardService, IFileService fileService, IWebHostEnvironment env)
        {
            this.cardService = cardService;
            this.fileService = fileService;
            this.env = env;
        }
        #endregion


        #region GET ALL Methods
        // GET: api/Cards/projects
        [HttpGet("projects")]
        public IActionResult GetProjects()
        {
            List<ProjectModel_Full> projList = cardService.GetProjAll();
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

        // GET: api/Cards/articles
        [HttpGet("articles")]
        public IActionResult GetArticles()
        {
            List<ArticleModel_Full> articleList = cardService.GetArticleAll();
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

        #region GET by ID METHODS
        // GET: api/Cards/projects/{id}
        [HttpGet("projects/{id}")]
        public IActionResult GetOneProject(string id)
        {
            ProjectModel_Full projList = cardService.GetProjById(id);
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

        // GET: api/Cards/articles/{id}
        [HttpGet("articles/{id}")]
        public IActionResult GetOneArticle(string id)
        {
            ArticleModel_Full articleList = cardService.GetArticleById(id);
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

        #region POST Methods
        // POST api/Cards
        [HttpPost("projects")]
        [RequestSizeLimit(104857600)] //100 MB
        public IActionResult CreateProject([FromForm] AdminItemDto newAdminItem)
        {
            // Saving the Files to WEB_ROOT/uploaded_files/projects/
            var savedURIs = fileService.WriteToFileinLocalFS(newAdminItem.Media, "PROJECTS");

            // If returned List<string> == null, Saving failed OR No image
            if (savedURIs.Result == null || savedURIs.Result?.Count<1) Response.Headers.Add("Images", "No images/Failed");
            else Response.Headers.Add("Images", "Saved");

            // Saving the record to DB
            var status = cardService.CreateProj(new ProjectModel_Full
            {
                Title = newAdminItem.Title,
                Tagline = newAdminItem.Tagline,
                Description = newAdminItem.Description,
                CreatedDate = DateTime.Today,
                MediaURIs = savedURIs.Result,
                MediaType = newAdminItem.MediaType
            });

            if (status)
            {
                return Created("Saved", null);
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }

        // POST api/Cards
        [HttpPost("articles")]
        public IActionResult CreateArticle([FromForm] AdminItemDto newAdminItem)
        {
            // Saving the Files to WEB_ROOT/uploaded_files/articles/
            var savedURIs = fileService.WriteToFileinLocalFS(newAdminItem.Media, "ARTICLES");

            // If returned List<string> == null, Saving failed OR No image
            if (savedURIs.Result == null || savedURIs.Result?.Count < 1) Response.Headers.Add("Images", "No images/Failed");
            else Response.Headers.Add("Images", "Saved");

            // Saving the record to DB
            var status = cardService.CreateArticle(new ArticleModel_Full
            {
                Title = newAdminItem.Title,
                Tagline = newAdminItem.Tagline,
                Description = newAdminItem.Description,
                CreatedDate = DateTime.Today,
                MediaURIs = savedURIs.Result,
                MediaType = newAdminItem.MediaType
            });

            if (status)
            {
                return Created("Saved", null);
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }
        #endregion

        #region DELETE Methods
        [HttpDelete("articles/{id}")]
        public IActionResult DelArticle(string id)
        {
            var status = cardService.DeleteArticle(id);
            if (status)
            {
                return Ok();
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }

        [HttpDelete("projects/{id}")]
        public IActionResult DelProject(string id)
        {
            var status = cardService.DeleteProj(id);
            if (status)
            {
                return Ok();
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }
        #endregion

        #region DELETE ALL
        [HttpDelete("projects")]
        public IActionResult DeleteAllProjects()
        {
            var status = cardService.DeleteAllProjects();

            if (status)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("articles")]
        public IActionResult DeleteAllArticles()
        {
            var status = cardService.DeleteAllArticles();

            if (status)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion

        #region UPDATE BY ID METHODS
        [HttpPut("projects")]
        public IActionResult UpdateProjects([FromForm] AdminItemDto adminItemDto)
        {
            var status = cardService.UpdateProj(adminItemDto);
            if (status)
            {
                return Ok();
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }

        [HttpPut("articles")]
        public IActionResult UpdateArticles([FromForm] AdminItemDto adminItemDto)
        {
            var status = cardService.UpdateArticle(adminItemDto);
            if (status)
            {
                return Ok();
            }
            else
            {
                Response.Headers.Add("Messsage", "Failed");
                return BadRequest();
            }
        }
        #endregion
    }
}
