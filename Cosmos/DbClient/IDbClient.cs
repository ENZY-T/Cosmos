using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CosmosLib
{
    public interface IDbClient
    {
        List<T> GET<T>(string table);
        T GETbyId<T>(string table, ObjectId id);
        List<T> GETbyAny<T>(string table, string field, string searchKey);
        void UPSERT<T>(string table, int id, T record);
        T INSERT<T>(string table, T record);
        void DELETE<T>(string table, int id);


    }
}
