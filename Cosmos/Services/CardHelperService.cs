using Cosmos.Dtos.Intefaces;
using Cosmos.Models;
using Cosmos.Models.Interfaces;
using Cosmos.Services.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class CardHelperService : ICardHelperService
    {
        private readonly IFileService fileService;

        public CardHelperService(IFileService fileService)
        {
            this.fileService = fileService;
        }
        public List<UpdateDefinition<T>> GetUpdateItemList<U,T>(U adminItemDto, T record) where U : IAdminItem where T : IProjectOrArticle 
        {
            List<UpdateDefinition<T>> updateList = new List<UpdateDefinition<T>>();
            try
            {
                bool isMediaFilesReceived = false;
                foreach (var adminProp in adminItemDto.GetType().GetProperties())
                {
                    var value = adminProp.GetValue(adminItemDto);
                    // Adding to UpdateTaskList if there's a update for them
                    if (adminProp.Name == "Media" && value != null)
                    {
                        isMediaFilesReceived = true;
                        List<string> newMediaURIs = fileService.WriteToFileinLocalFS(adminItemDto.Media, "ARTICLES").Result;
                        fileService.DeleteFilesinLocalFSAsync(record.MediaURIs);

                        // Setting the update item for the obtained MediaURIs
                        updateList.Add(Builders<T>.Update.Set("MediaURIs", newMediaURIs));

                    }
                    else if (adminProp.Name == "MediaURIs" && value != null)
                    {
                        // In case of both media file and MediaURIs updates in a single request, it may cause conflicts.
                        // So, request should abondand
                        if (isMediaFilesReceived) return null;

                        // setting the update item for incomming MediaURIs
                        updateList.Add(Builders<T>.Update.Set("MediaURIs", (List<string>)value));

                        // Cleaning up the saved files for the new update
                        fileService.CleanURIs(record.MediaURIs, value as List<string>);     // Later=>Use the return status to generate the success statement

                    }
                    else if (adminProp.Name != "CreatedDate" && adminProp.Name != "Id" && value != null)
                    {
                        if((string)value == "[clear]")
                        {
                            updateList.Add(Builders<T>.Update.Set<string>(adminProp.Name, null));
                        }
                        else
                        {
                            updateList.Add(Builders<T>.Update.Set(adminProp.Name, (string)value));
                        }
                    }
                }
                record.CreatedDate = DateTime.Today;
            }
            catch (Exception ex) { /*Later=>Can write to count the errors and return in the response header as successes and fails*/ }
            return updateList;
        }
    }
}
