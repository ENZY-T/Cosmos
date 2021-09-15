using Cosmos.Models;
using Cosmos.Services.Interfaces;
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
        private readonly IDbClient dbClient;
        private readonly IFileService fileService;

        public CardService(IDbClient dbClient, IFileService fileService)
        {
            this.dbClient = dbClient;
            this.fileService = fileService;
        }

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
            bool mediaFilesCleanStatus = fileService.DeleteFilesinLocalFS(articleModel_Full.MediaURIs);

            bool status = dbClient.Delete<ArticleModel_Full>("Articles", nameof(articleModel_Full.Id), articleModel_Full.Id);
            return mediaFilesCleanStatus && status;
        }

        public bool DeleteProj(string id)
        {
            var project = dbClient.GetbyId<ProjectModel_Full>("Projects", id);
            if (project == null) return false;

            // Deleting the related media files
            bool mediaFilesCleanStatus = fileService.DeleteFilesinLocalFS(project.MediaURIs);

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
            if (ArticleList == null || ArticleList.Count == 0)
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
        public bool UpdateArticle(AdminItemDto adminItemDto)
        {
            // Getting the record
            var record = dbClient.GetbyId<ArticleModel_Full>("Articles", adminItemDto.Id);
            if (record == null) return false;

            // Getting the properties to be updated
            List<UpdateDefinition<ArticleModel_Full>> updateList = new List<UpdateDefinition<ArticleModel_Full>>();
            try
            {
                foreach (var adminProp in adminItemDto.GetType().GetProperties())
                {

                    var value = adminProp.GetValue(adminItemDto);
                    if (adminProp.Name != "CreatedDate" && adminProp.Name != "Id" && !string.IsNullOrEmpty((string)value))
                    {
                        updateList.Add(Builders<ArticleModel_Full>.Update.Set(adminProp.Name, (string)value));
                        var x = record.GetType().GetProperty(adminProp.Name);

                        x.SetValue(record, (string)value);
                    }

                }
                record.CreatedDate = DateTime.Today;
            }
            catch (Exception ex) { }

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
            List<UpdateDefinition<ProjectModel_Full>> updateList = new List<UpdateDefinition<ProjectModel_Full>>();
            try
            {
                foreach (var adminProp in adminItemDto.GetType().GetProperties())
                {

                    var value = adminProp.GetValue(adminItemDto);
                    if (adminProp.Name != "CreatedDate" && adminProp.Name != "Id" && !string.IsNullOrEmpty((string)value))
                    {
                        updateList.Add(Builders<ProjectModel_Full>.Update.Set(adminProp.Name, (string)value));
                        var x = record.GetType().GetProperty(adminProp.Name);

                        x.SetValue(record, (string)value);
                    }

                }
                record.CreatedDate = DateTime.Today;
            }
            catch (Exception ex) { }

            // Updating
            var filter = Builders<ProjectModel_Full>.Filter.Eq("Id", adminItemDto.Id);
            bool status = false;
            foreach (var update in updateList)
            {
                status = dbClient.UpdateOne<ProjectModel_Full>("Projects", filter, update);

            }
            return status;
        }
        #endregion

    }
}
