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
    public class DbClient : IDbClient
    {
        public IMongoDatabase Cosmos_db;

        public DbClient(string ConnStr, string dbName)
        {
            try
            {
                var client = new MongoClient(ConnStr);
                Cosmos_db = client.GetDatabase(dbName);

                //MakeUSerEmailUnique_Users();

            }
            catch { }
        }

        #region Unique key specification per table
        /// <summary>
        /// Assigning a unique key if theres no. 
        /// </summary>
        private async void MakeUSerEmailUnique_Users()
        {
            var indexOptions = new CreateIndexOptions() { Unique = true, Name = "primary" };
            var indexKeys = Builders<UserModel>.IndexKeys.Ascending(table => table.Email);
            var indexModel = new CreateIndexModel<UserModel>(indexKeys, indexOptions);
            await Cosmos_db.GetCollection<UserModel>("Users").Indexes.CreateOneAsync(indexModel);
        }

        private async void MakeUSerEmailUnique_Projects()
        {
            var indexOptions = new CreateIndexOptions() { Unique = true, Name = "primary" };
            var indexKeys = Builders<ProjectModel_Full>.IndexKeys.Ascending(table => table.Id);
            var indexModel = new CreateIndexModel<ProjectModel_Full>(indexKeys, indexOptions);
            await Cosmos_db.GetCollection<ProjectModel_Full>("Projects").Indexes.CreateOneAsync(indexModel);
        }


        private async void MakeUSerEmailUnique_Articles()
        {
            var indexOptions = new CreateIndexOptions() { Unique = true, Name = "primary" };
            var indexKeys = Builders<ArticleModel_Full>.IndexKeys.Ascending(table => table.Id);
            var indexModel = new CreateIndexModel<ArticleModel_Full>(indexKeys, indexOptions);
            await Cosmos_db.GetCollection<ArticleModel_Full>("Projects").Indexes.CreateOneAsync(indexModel);
        }
        #endregion

        public T GetbyId<T>(string table, string id)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                ObjectId objectId = new ObjectId(id);

                var filter = Builders<T>.Filter.Eq("Id", objectId);
                return Coll.Find(filter).Any() ? Coll.Find(filter).FirstOrDefault() : default(T);

            }
            catch (Exception)
            {
                return default;
            }
        }
        public List<T> GetbyAny<T>(string table, string field, string searchKey)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var filter = Builders<T>.Filter.Eq(field, searchKey);
                var result = Coll.Find(filter).ToList();

                return result.Any() ? result : new List<T>();

            }
            catch (Exception)
            {
                return default;
            }
        }

        public List<T> Get<T>(string table)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var result = Coll.Find(new BsonDocument()).Any() ? Coll.Find(new BsonDocument()).ToList() : new List<T>();
                return result;
            }
            catch (Exception ex)
            {
                return default;
            }
        }


        public T Insert<T>(string table, T record)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
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

        public bool Delete<T>(string table, string keyName, string keyValue)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var filter = Builders<T>.Filter.Eq(keyName, keyValue);
                Coll.DeleteOne(filter);
                return true;

            }
            catch (Exception)
            {
                return false; ;
            }
        }

        public async Task<bool> DeleteAll<T>(string table)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                await Coll.DeleteManyAsync(new BsonDocument());
                return true;

            }
            catch (Exception)
            {
                return false; ;
            }
        }

        public bool UpdateOne<T>(string table, FilterDefinition<T> filter, UpdateDefinition<T> update)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var result = Coll.UpdateOne(filter, update);
                return result.ModifiedCount > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }


    }
}
