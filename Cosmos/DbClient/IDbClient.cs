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
        List<T> GET<T>(string table);
        T GETbyId<T>(string table, ObjectId id);
        List<T> GETbyAny<T>(string table, string field, string searchKey);
        bool UPSERT<T>(string table, BsonDocument filterBsonDoc, T record);
        T INSERT<T>(string table, T record);
        bool DELETE<T>(string table, string keyName, string keyValue);


    }
}
