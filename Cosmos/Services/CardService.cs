using Cosmos.Dtos.Intefaces;
using Cosmos.Models;
using Cosmos.Models.Interfaces;
using Cosmos.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class CardService : ICardService
    {
        #region Initialization
        private readonly IDbClient dbClient;
        private readonly IFileService fileService;
        private readonly ICardHelperService cardHelperService;

        public CardService(IDbClient dbClient, IFileService fileService, ICardHelperService cardHelperService)
        {
            this.dbClient = dbClient;
            this.fileService = fileService;
            this.cardHelperService = cardHelperService;
        }
        #endregion


        #region CREATE
        public bool CreateArticle(ArticleModel_Full articleModel_Full)
        {
            ArticleModel_Full status = dbClient.Insert<ArticleModel_Full>("Articles", articleModel_Full);
            if (status != null) return true; else return false;
        }

        public bool CreateProj(ProjectModel_Full projectModel_Full)
        {
            ProjectModel_Full status = dbClient.Insert<ProjectModel_Full>("Projects", projectModel_Full);
            if (status != null) return true; else return false;
        }
        #endregion

        #region DELETE 
        public bool DeleteArticle(string id)
        {
            var articleModel_Full = dbClient.GetbyId<ArticleModel_Full>("Articles", id);
            if (articleModel_Full == null) return false;

            // Deleting the related media files
            bool mediaFilesCleanStatus = fileService.DeleteFilesinLocalFSAsync(articleModel_Full.MediaURIs).Result;

            bool status = dbClient.Delete<ArticleModel_Full>("Articles", nameof(articleModel_Full.Id), articleModel_Full.Id);
            return mediaFilesCleanStatus && status;
        }

        public bool DeleteProj(string id)
        {
            var project = dbClient.GetbyId<ProjectModel_Full>("Projects", id);
            if (project == null) return false;

            // Deleting the related media files
            bool mediaFilesCleanStatus = fileService.DeleteFilesinLocalFSAsync(project.MediaURIs).Result;

            bool status = dbClient.Delete<ProjectModel_Full>("Projects", nameof(project.Id), project.Id);
            return mediaFilesCleanStatus && status;
        }
        #endregion

        #region GET BY ID
        public ProjectModel_Full GetProjById(string id)
        {
            var project = dbClient.GetbyId<ProjectModel_Full>("Projects", id);
            if (project == null) return null;
            else return project;

        }
        public ArticleModel_Full GetArticleById(string id)
        {
            var articleModel_Full = dbClient.GetbyId<ArticleModel_Full>("Articles", id);
            if (articleModel_Full == null) return null;
            else return articleModel_Full;
        }
        #endregion

        #region GET_ALL
        public List<ArticleModel_Full> GetArticleAll()
        {
            List<ArticleModel_Full> ArticleList = dbClient.Get<ArticleModel_Full>("Articles");
            if (ArticleList == null || ArticleList?.Count == 0)
            {
                return null;
            }
            else
            {
                return ArticleList;
            }

        }


        public List<ProjectModel_Full> GetProjAll()
        {
            List<ProjectModel_Full> projList = dbClient.Get<ProjectModel_Full>("Projects");
            if (projList == null || projList?.Count == 0)
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
        public bool UpdateArticle(AdminItemDto adminItemDto)
        {
            // Getting the record
            var record = dbClient.GetbyId<ArticleModel_Full>("Articles", adminItemDto.Id);
            if (record == null) return false;

            // Getting the properties to be updated
            List<UpdateDefinition<ArticleModel_Full>> updateList = cardHelperService.GetUpdateItemList<AdminItemDto,ArticleModel_Full>(adminItemDto,record);
            

            // Updating
            var filter = Builders<ArticleModel_Full>.Filter.Eq("Id", adminItemDto.Id);
            bool status = false;
            foreach (var update in updateList)
            {
                status = dbClient.UpdateOne<ArticleModel_Full>("Articles", filter, update);

            }
            return status;
        }

        public bool UpdateProj(AdminItemDto adminItemDto)
        {
            // Getting the record
            var record = dbClient.GetbyId<ProjectModel_Full>("Projects", adminItemDto.Id);
            if (record == null) return false;

            // Getting the properties to be updated
            List<UpdateDefinition<ProjectModel_Full>> updateList = cardHelperService.GetUpdateItemList<AdminItemDto, ProjectModel_Full>(adminItemDto, record);

            // Updating
            var filter = Builders<ProjectModel_Full>.Filter.Eq("Id", adminItemDto.Id);
            bool status = false;
            foreach (var update in updateList)
            {
                status = status || dbClient.UpdateOne<ProjectModel_Full>("Projects", filter, update);
            }
            return status;
        }

        public bool DeleteAllProjects()
        {
            var status = dbClient.DeleteAll<ProjectModel_Full>("Projects").Result;

            // Clean the media files in FS
            bool delStatus = fileService.DeleteAll("PROJECTS").Result;
            if (status && delStatus)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteAllArticles()
        {
            var status = dbClient.DeleteAll<ArticleModel_Full>("Articles").Result;

            // Clean the media files in FS
            bool delStatus = fileService.DeleteAll("ARTICLES").Result;
            if (status && delStatus)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

    }
}
