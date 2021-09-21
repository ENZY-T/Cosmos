using Cosmos.Dtos.Intefaces;
using Cosmos.Models;
using Cosmos.Models.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services.Interfaces
{
    public interface ICardHelperService
    {
        /// <summary>
        /// Generate the list of update items to be injected to the mongo Updating finction using the inserted AdminItem DTO
        /// </summary>
        /// <param name="adminItemDto">Incoming Adming item object containg the data tobe updated</param>
        /// <returns></returns>
        public List<UpdateDefinition<T>> GetUpdateItemList<U, T>(U adminItemDto, T record) where U : IAdminItem where T : IProjectOrArticle;
    }
}
