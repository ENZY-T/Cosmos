using Cosmos.Models;
using Cosmos.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cosmos.Dtos;

namespace Cosmos.Services
{
    public class CardService : ICardService
    {

        #region Initialization

        private readonly IDbClient _dbClient;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public CardService(IDbClient dbClient, IFileService fileService, IMapper mapper)
        {
            _dbClient = dbClient;
            _fileService = fileService;
            _mapper = mapper;
        }

        #endregion


        #region CREATE

        public async Task<bool> CreateArticle(ArticleDbModel articleDbModel)
        {
            var status = await _dbClient.InsertAsync<ArticleDbModel>("Articles", articleDbModel);
            return status != null;
        }

        public async Task<bool> CreateProj(ProjectDbModel projectDbModel)
        {
            var status = await _dbClient.InsertAsync<ProjectDbModel>("Projects", projectDbModel);
            return status != null;
        }

        #endregion

        #region DELETE

        public async Task<bool> DeleteArticle(string id)
        {
            return await _dbClient.DeleteAsync<ArticleDbModel>("Articles", "Id", id);
        }

        public async Task<bool> DeleteProj(string id)
        {
            var project = await _dbClient.GetById<ProjectDbModel>("Projects", id);
            if (project == null) return false;

            if (!(project.MediaURIs == null || project.MediaURIs.Count < 1))
            {
                // Deleting the related media files
                foreach (var uri in project.MediaURIs.Where(uri => _fileService.IsFileExist(uri)))
                {
                    await _fileService.DeleteFileByUri(uri);
                }
            }

            var status = await _dbClient.DeleteAsync<ProjectDbModel>("Projects", nameof(project.Id), project.Id);
            return status;
        }


        public bool DeleteAllProjects()
        {
            var status = _dbClient.DeleteAll<ProjectDbModel>("Projects").Result;

            // Clean the media files in FS
            var delStatus = _fileService.DeleteAll("PROJECTS").Result;
            return status && delStatus;
        }

        public bool DeleteAllArticles()
        {
            var status = _dbClient.DeleteAll<ArticleDbModel>("Articles").Result;

            // Clean the media files in FS
            var delStatus = _fileService.DeleteAll("ARTICLES").Result;
            return status && delStatus;
        }

        #endregion

        #region GET BY ID

        public async Task<ProjectDbModel> GetProjById(string id)
        {
            return await _dbClient.GetById<ProjectDbModel>("Projects", id);
        }

        public async Task<ArticleDbModel> GetArticleById(string id)
        {
            return await _dbClient.GetById<ArticleDbModel>("Articles", id);
        }

        #endregion

        #region GET_ALL

        public async Task<List<ArticleDbModel>> GetArticleAll()
        {
            var articleList = await _dbClient.Get<ArticleDbModel>("Articles");
            if (articleList == null || articleList?.Count == 0)
            {
                return null;
            }

            return articleList;
        }


        public async Task<List<ProjectDbModel>> GetProjAll()
        {
            var projList = await _dbClient.Get<ProjectDbModel>("Projects");
            return projList == null || projList?.Count == 0 ? null : projList;
        }

        #endregion

        #region UPDATE

        public async Task<bool> UpdateArticle(ArticleDbModel newArticle)
        {
            return await _dbClient.UpdateOne(DbTables.Articles.ToString(), newArticle);
        }

        public async Task<bool> UpdateProj(ProjectDbModel newProject)
        {
            return await _dbClient.UpdateOne(DbTables.Projects.ToString(), newProject);
        }

        #endregion

        #region Reviews

        public Task<List<ReviewDbModel>> GetReviewsByProjectId(string projectId)
        {
            var reviews = _dbClient.GetByAnyAsync<ReviewDbModel>("Reviews", "ProjectId", projectId);
            
            return reviews;
        }

        public Task<ReviewDbModel> GetReviewById(int id)
        {
            return _dbClient.GetById<ReviewDbModel>("Reviews", id.ToString());
        }

        public async Task<ReviewDbModel> InsertReview(ReviewDto review)
        {
            var model = _mapper.Map<ReviewDbModel>(review);

            var createdReview = await _dbClient.InsertAsync("Reviews", model);
            return createdReview;
        }

        public async Task<bool> DeleteReview(string id)
        {
            var result = await _dbClient.DeleteAsync<ReviewDbModel>("Reviews", "Id", id);
            return result;
        }

        public async Task<bool> UpdateReview(ReviewDto review)
        {
            var model = _mapper.Map<ReviewDbModel>(review);

            var result = await _dbClient.UpdateOne("Reviews", model);

            return result;
        }

        #endregion
    }
}