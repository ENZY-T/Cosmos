using Cosmos.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos
{
    public interface IDbClient
    {
        List<T> Get<T>(string table);
        T GetbyId<T>(string table, string id);
        List<T> GetbyAny<T>(string table, string field, string searchKey);
        bool UpdateOne<T>(string table, FilterDefinition<T> filter, UpdateDefinition<T> update);
        T Insert<T>(string table, T record);
        bool Delete<T>(string table, string keyName, string keyValue);
        Task<bool> DeleteAll<T>(string table);



    }
}
