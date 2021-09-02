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
        List<AdminItemModel> GetProjAll();
        bool CreateProj(ProjectModel_Full projectModel_Full);
        bool DeleteProj(ProjectModel_Full projectModel_Full);
        bool UpdateProj(ProjectModel_Full projectModel_Full);
        #endregion

        #region CRUD on Articles
        List<AdminItemModel> GetArticleAll();
        bool CreateArticle(ArticleModel_Full articleModel_Full);
        bool DeleteArticle(ArticleModel_Full articleModel_Full);
        bool UpdateArticle(ArticleModel_Full articleModel_Full);
        #endregion

    }
}
