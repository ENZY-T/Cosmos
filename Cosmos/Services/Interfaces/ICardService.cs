using Cosmos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.Dtos;

namespace Cosmos.Services.Interfaces
{
    public interface ICardService
    {
        #region CRUD on projects

        Task<ProjectDbModel> GetProjById(string id);
        Task<List<ProjectDbModel>> GetProjAll();
        Task<bool> CreateProj(ProjectDbModel projectDbModel);
        Task<bool> DeleteProj(string id);
        Task<bool> UpdateProj(ProjectDbModel projectDbModel);

        #endregion

        #region CRUD on Articles

        Task<ArticleDbModel> GetArticleById(string id);
        Task<List<ArticleDbModel>> GetArticleAll();
        Task<bool> CreateArticle(ArticleDbModel articleDbModel);
        Task<bool> DeleteArticle(string id);
        public Task<bool> UpdateArticle(ArticleDbModel newArticle);
        bool DeleteAllProjects();
        bool DeleteAllArticles();

        #endregion

        #region Reviews

        Task<List<ReviewDbModel>> GetReviewsByProjectId(string projectId);
        Task<ReviewDbModel> GetReviewById(int id);
        Task<ReviewDbModel> InsertReview(ReviewDto review);
        Task<bool> DeleteReview(string id);
        Task<bool> UpdateReview(ReviewDto review);
        

        #endregion
    }
}