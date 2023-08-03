using Cosmos;
using Cosmos.Models;
using Cosmos.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cosmos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RequestSizeLimit(104857600)] //100MB Max HTTP content limit
    public class CardsController : ControllerBase
    {
        #region Initialization

        private readonly ICardService _cardService;
        private readonly IFileService _fileService;
        private readonly IWebHostEnvironment _env;
        private readonly IMapper _mapper;

        public CardsController(ICardService cardService,
            IFileService fileService,
            IWebHostEnvironment env,
            IMapper mapper)
        {
            this._cardService = cardService;
            this._fileService = fileService;
            this._env = env;
            _mapper = mapper;
        }

        #endregion


        #region GET ALL Methods

        // GET: api/Cards/projects
        [HttpGet("projects")]
        public async Task<IActionResult> GetProjects()
        {
            var projList = await _cardService.GetProjAll();
            if (projList != null)
            {
                return Ok(projList);
            }
            else
            {
                Response.Headers.Add("Message", "Data not found");
                return NotFound();
            }
        }

        // GET: api/Cards/articles
        [HttpGet("articles")]
        public async Task<IActionResult> GetArticles()
        {
            var articleList = await _cardService.GetArticleAll();
            if (articleList != null)
            {
                return Ok(articleList);
            }
            else
            {
                Response.Headers.Add("Message", "Data not found");
                return NotFound();
            }
        }

        #endregion

        #region GET by ID METHODS

        // GET: api/Cards/projects/{id}
        [HttpGet("projects/{id}")]
        public async Task<IActionResult> GetOneProject(string id)
        {
            var projList = await _cardService.GetProjById(id);
            if (projList != null)
            {
                return Ok(projList);
            }
            else
            {
                Response.Headers.Add("Message", "Data not found");
                return NotFound();
            }
        }

        // GET: api/Cards/articles/{id}
        [HttpGet("articles/{id}")]
        public async Task<IActionResult> GetOneArticle(string id)
        {
            var articleDbList = await _cardService.GetArticleById(id);
            if (articleDbList != null)
            {
                return Ok(articleDbList);
            }
            else
            {
                Response.Headers.Add("Message", "Data not found");
                return NotFound();
            }
        }

        #endregion

        #region POST Methods

        // POST api/Cards
        [HttpPost("projects")]
        [RequestSizeLimit(104857600)] //100 MB
        public async Task<IActionResult> CreateProject([FromForm] AdminItemDto newAdminItem)
        {
            // Saving the Files to WEB_ROOT/uploaded_files/projects/
            List<string> savedUris = null;
            if (newAdminItem.Media != null)
            {
                savedUris = await _fileService.WriteToFileinLocalFS(newAdminItem.Media, "PROJECTS");

                var imageDescriptionEnumerator = newAdminItem.MediaDescriptions?.GetEnumerator();

                var savedImages = new List<ImageModel>();
                foreach (var uri in savedUris)
                {
                    savedImages.Add(new ImageModel() { Uri = uri, Description = imageDescriptionEnumerator?.Current });
                    imageDescriptionEnumerator?.MoveNext();
                }

                // If returned List<string> == null, Saving failed OR No image
                if (savedUris == null || savedUris?.Count < 1) Response.Headers.Add("Images", "No images/Failed");
                else Response.Headers.Add("Images", "Saved");
            }

            // Saving the record to DB
            var project = _mapper.Map<ProjectDbModel>(newAdminItem);
            project.MediaURIs = savedUris;
            var status = await _cardService.CreateProj(project);

            if (status)
            {
                return Created("Saved", null);
            }

            Response.Headers.Add("Message", "Failed");
            return BadRequest();
        }

        // POST api/Cards
        [HttpPost("articles")]
        public async Task<IActionResult> CreateArticle([FromForm] AdminItemDto newAdminItem)
        {
            // Saving the Files to WEB_ROOT/uploaded_files/articles/
            var savedURIs = _fileService.WriteToFileinLocalFS(newAdminItem.Media, "ARTICLES");

            // If returned List<string> == null, Saving failed OR No image
            if (savedURIs.Result == null || savedURIs.Result?.Count < 1)
                Response.Headers.Add("Images", "No images/Failed");
            else Response.Headers.Add("Images", "Saved");

            // Saving the record to DB
            var status = await _cardService.CreateArticle(new ArticleDbModel
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
                Response.Headers.Add("Message", "Failed");
                return BadRequest();
            }
        }

        #endregion

        #region DELETE Methods

        [HttpDelete("articles/{id}")]
        public async Task<IActionResult> DelArticle(string id)
        {
            var article = await _cardService.GetArticleById(id);
            if (article == null)
                return BadRequest("Record not found.");

            // Deleting the related media files
            try
            {
                foreach (var uri in article.MediaURIs)
                {
                    await _fileService.DeleteFileByUri(uri);
                }
            }
            catch
            {
                Request.Headers.Add("error", "Error in cleaning media files");
            }

            var status = await _cardService.DeleteArticle(id);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("projects/{id}")]
        public async Task<IActionResult> DelProject(string id)
        {
            var status = await _cardService.DeleteProj(id);
            if (status)
            {
                return Ok();
            }
            else
            {
                Response.Headers.Add("Message", "Failed");
                return BadRequest();
            }
        }

        #endregion

        #region DELETE ALL

        [HttpDelete("projects")]
        public IActionResult DeleteAllProjects()
        {
            var status = _cardService.DeleteAllProjects();

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
            var status = _cardService.DeleteAllArticles();

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
        public async Task<IActionResult> UpdateProjects([FromForm] AdminItemDto adminItemDto)
        {
            // Get old record
            var record = await _cardService.GetProjById(adminItemDto.Id);

            if (record == null)
            {
                return BadRequest("Record not found");
            }

            // Delete old media which are not in request's mediaURIs
            foreach (var uri in record.MediaURIs.Except(adminItemDto.MediaUris) ?? new List<string>())
            {
                await _fileService.DeleteFileByUri(uri);
            }

            // Save new media
            var newUris = await _fileService.WriteToFileinLocalFS(adminItemDto.Media, "PROJECTS");

            if (newUris is null) throw new IOException("error in file writes");
            
            var dbModel = _mapper.Map<ProjectDbModel>(adminItemDto);

            newUris.ForEach(uri =>
            {
                dbModel.MediaURIs.Add(uri);
            });
            
            // Image Descriptions
            dbModel.MediaDescriptions = adminItemDto.UriDescriptions?.Concat(adminItemDto.MediaDescriptions ?? new List<string>()).ToList();
            

            var status = await _cardService.UpdateProj(dbModel);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Failed to update.");
        }

        [HttpPut("articles")]
        public async Task<IActionResult> UpdateArticles([FromForm] AdminItemDto adminItemDto)
        {
            // Get old record
            var record = await _cardService.GetArticleById(adminItemDto.Id);

            if (record == null)
            {
                return BadRequest("Record not found");
            }

            // Delete old media
            foreach (var uri in record.MediaURIs)
            {
                await _fileService.DeleteFileByUri(uri);
            }

            // Save new media
            await _fileService.WriteToFileinLocalFS(adminItemDto.Media, "ARTICLES");

            var dbModel = _mapper.Map<ArticleDbModel>(adminItemDto);

            var status = await _cardService.UpdateArticle(dbModel);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Failed to update.");
        }

        #endregion
    }
}