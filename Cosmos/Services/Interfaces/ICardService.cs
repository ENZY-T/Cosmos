using Cosmos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services.Interfaces
{
    public interface ICardService
    {
        #region CRUD on projects
        ProjectModel_Full GetProjById(string id);
        List<ProjectModel_Full> GetProjAll();
        bool CreateProj(ProjectModel_Full projectModel_Full);
        bool DeleteProj(string id);
        bool UpdateProj(AdminItemDto adminItemDto);
        #endregion

        #region CRUD on Articles
        ArticleModel_Full GetArticleById(string id);
        List<ArticleModel_Full> GetArticleAll();
        bool CreateArticle(ArticleModel_Full articleModel_Full);
        bool DeleteArticle(string id);
        bool UpdateArticle(AdminItemDto adminItemDto);
        bool DeleteAllProjects();
        bool DeleteAllArticles();
        #endregion

    }
}
