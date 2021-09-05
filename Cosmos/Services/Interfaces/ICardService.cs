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
        bool DeleteProj(string id);
        bool UpdateProj(string id);
        #endregion

        #region CRUD on Articles
        List<AdminItemModel> GetArticleAll();
        bool CreateArticle(ArticleModel_Full articleModel_Full);
        bool DeleteArticle(string id);
        bool UpdateArticle(string id);
        #endregion

    }
}
