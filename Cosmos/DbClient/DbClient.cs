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
    public class DbClient : IDbClient
    {
        public IMongoDatabase PNet_db;

        public DbClient(string ConnStr, string dbName)
        {
            var client = new MongoClient(ConnStr);
            PNet_db = client.GetDatabase(dbName);

            MakeUSerEmailUnique();

        }

        private async void MakeUSerEmailUnique()
        {
            var indexOptions = new CreateIndexOptions() { Unique =true };
            var indexKeys = Builders<UserModel>.IndexKeys.Ascending( table=> table.Email);
            var indexModel = new CreateIndexModel<UserModel>(indexKeys, indexOptions);
            await PNet_db.GetCollection<UserModel>("Users").Indexes.CreateOneAsync(indexModel);
        }


        public T GETbyId<T>(string table, ObjectId id)
        {
            var Coll = PNet_db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("Id", id);
            
            return Coll.Find(filter).Any() ? Coll.Find(filter).FirstOrDefault() : default(T);
        }
        public List<T> GETbyAny<T>(string table, string field, string searchKey)
        {
            var Coll = PNet_db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, searchKey);
            var result = Coll.Find(filter).ToList();

            return result.Any() ? result : new List<T>();
        }

        public List<T> GET<T>(string table)
        {
            var Coll = PNet_db.GetCollection<T>(table);
            return Coll.Find(new BsonDocument()).Any() ? Coll.Find(new BsonDocument()).ToList() : new List<T>();
        }


        public T INSERT<T>(string table, T record)
        {
            var Coll = PNet_db.GetCollection<T>(table);
            try
            {
                Coll.InsertOne(record);
                return record;
            }
            catch (Exception)
            {
            return default(T);
            }
        }

        public void DELETE<T>(string table, int id) 
        {
            var Coll = PNet_db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("Id", id);
            Coll.DeleteOne(filter);
        }

        void IDbClient.UPSERT<T>(string table, int id, T record)
        {
            var Coll = PNet_db.GetCollection<T>(table);
            var result = Coll.ReplaceOne(new BsonDocument("Id", id), record, new ReplaceOptions { IsUpsert = true }); ;
        }

    }
}
