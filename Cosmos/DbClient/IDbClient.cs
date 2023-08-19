using Cosmos.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Cosmos.Models.Interfaces;

namespace Cosmos
{
    public interface IDbClient
    {
        Task<List<T>> Get<T>(string table);
        Task<T> GetById<T>(string table, string id);
        Task<List<T>> GetByAnyAsync<T>(string table, string field, string searchKey);
        public Task<bool> UpdateOne<T>(string table, T updatedRecord) where T : IMongoRecord;
        Task<T> InsertAsync<T>(string table, T record);
        Task<bool> DeleteAsync<T>(string table, string keyName, string keyValue);
        Task<bool> DeleteAll<T>(string table);
    }
}