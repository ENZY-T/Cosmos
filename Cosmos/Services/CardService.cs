using Cosmos.Models;
using Cosmos.Services.Interfaces;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class CardService : ICardService
    {
        private readonly IDbClient dbClient;

        public CardService(IDbClient dbClient)
        {
            this.dbClient = dbClient;
        }

        #region CREATE
        public bool CreateArticle(ArticleModel_Full articleModel_Full)
        {
            ArticleModel_Full status = dbClient.INSERT<ArticleModel_Full>("Articles", articleModel_Full);
            if (status != null) return true; else return false;
        }

        public bool CreateProj(ProjectModel_Full projectModel_Full)
        {
            ProjectModel_Full status = dbClient.INSERT<ProjectModel_Full>("Projects", projectModel_Full);
            if (status != null) return true; else return false;
        }
        #endregion

        #region DELETE 
        public bool DeleteArticle(string id)
        {
            var articleModel_Full = dbClient.GETbyId<ArticleModel_Full>("Articles", id);
            if (articleModel_Full == null) return false;

            bool status = dbClient.DELETE<ArticleModel_Full>("Articles", nameof(articleModel_Full.Id), articleModel_Full.Id);
            return status;
        }

        public bool DeleteProj(string id)
        {
            var projectModel_Full = dbClient.GETbyId<ProjectModel_Full>("Projects", id);
            if (projectModel_Full == null) return false;

            bool status = dbClient.DELETE<ProjectModel_Full>("Projects", nameof(projectModel_Full.Id), projectModel_Full.Id);
            return status;
        }
        #endregion

        #region GET_ALL
        public List<AdminItemModel> GetArticleAll()
        {
            List<AdminItemModel> ArticleList = dbClient.GET<AdminItemModel>("Articles");
            if (ArticleList == null || ArticleList.Count == 0)
            {
                return null;
            }
            else
            {
                return ArticleList;
            }

        }

        public List<AdminItemModel> GetProjAll()
        {
            List<AdminItemModel> projList = dbClient.GET<AdminItemModel>("Projects");
            if (projList == null || projList.Count == 0)
            {
                return null;
            }
            else
            {
                return projList;
            }
        }
        #endregion

        #region UPDATE
        public bool UpdateArticle(string id)
        {
            // Getting the record
            var record = dbClient.GETbyId<ArticleModel_Full>("Articles", id);
            if (record == null) return false;

            // Updating
            var filter = new BsonDocument(nameof(record.Id), record.Id);
            bool status = dbClient.UPSERT<ArticleModel_Full>("Articles", filter, record);
            return status;
        }

        public bool UpdateProj(string id)
        {
            // Getting the record
            var record = dbClient.GETbyId<ProjectModel_Full>("Projects", id);
            if (record == null) return false;

            // Updating
            var filter = new BsonDocument(nameof(record.Id), record.Id);
            bool status = dbClient.UPSERT<ProjectModel_Full>("Articles", filter, record);
            return status;
        }
        #endregion
    }
}
