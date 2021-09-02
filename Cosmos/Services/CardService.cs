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

        public bool DeleteArticle(ArticleModel_Full articleModel_Full)
        {
            bool status = dbClient.DELETE<ArticleModel_Full>("Articles", nameof(articleModel_Full.Id), articleModel_Full.Id);
            return status;
        }

        public bool DeleteProj(ProjectModel_Full projectModel_Full)
        {
            bool status = dbClient.DELETE<ProjectModel_Full>("Projects", nameof(projectModel_Full.Id), projectModel_Full.Id);
            return status;
        }


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

        public bool UpdateArticle(ArticleModel_Full articleModel_Full)
        {
            var filter = new BsonDocument(nameof(articleModel_Full.Id), articleModel_Full.Id);
            bool status = dbClient.UPSERT<ArticleModel_Full>("Articles", filter, articleModel_Full);
            return status;
        }

        public bool UpdateProj(ProjectModel_Full projectModel_Full)
        {
            var filter = new BsonDocument(nameof(projectModel_Full.Id), projectModel_Full.Id);
            bool status = dbClient.UPSERT<ProjectModel_Full>("Articles", filter, projectModel_Full);
            return status;
        }
    }
}
