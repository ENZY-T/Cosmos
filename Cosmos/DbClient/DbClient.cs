using Cosmos.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.Models.Interfaces;

namespace Cosmos
{
    public class DbClient : IDbClient
    {
        private readonly IMongoDatabase Cosmos_db;

        public DbClient(string connStr, string dbName)
        {
            try
            {
                var client = new MongoClient(connStr);
                Cosmos_db = client.GetDatabase(dbName);

                //MakeUSerEmailUnique_Users();
            }
            catch
            {
                throw new MongoException("Connection failed");
            }
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
            var indexKeys = Builders<ProjectDbModel>.IndexKeys.Ascending(table => table.Id);
            var indexModel = new CreateIndexModel<ProjectDbModel>(indexKeys, indexOptions);
            await Cosmos_db.GetCollection<ProjectDbModel>("Projects").Indexes.CreateOneAsync(indexModel);
        }


        private async void MakeUSerEmailUnique_Articles()
        {
            var indexOptions = new CreateIndexOptions() { Unique = true, Name = "primary" };
            var indexKeys = Builders<ArticleDbModel>.IndexKeys.Ascending(table => table.Id);
            var indexModel = new CreateIndexModel<ArticleDbModel>(indexKeys, indexOptions);
            await Cosmos_db.GetCollection<ArticleDbModel>("Projects").Indexes.CreateOneAsync(indexModel);
        }

        #endregion

        public async Task<T> GetbyId<T>(string table, string id)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var objectId = new ObjectId(id);

                var filter = Builders<T>.Filter.Eq("Id", objectId);
                return await Coll.Find(filter).FirstOrDefaultAsync();
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

        public async Task<List<T>> Get<T>(string table)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                var result = await Coll.Find(new BsonDocument()).AnyAsync()
                    ? Coll.Find(new BsonDocument()).ToList()
                    : new List<T>();
                return result;
            }
            catch (Exception)
            {
                return default;
            }
        }


        public async Task<T> InsertAsync<T>(string table, T record)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            try
            {
                await Coll.InsertOneAsync(record);
                return record;
            }
            catch
            {
                return default(T);
            }
        }

        public async Task<bool> DeleteAsync<T>(string table, string keyName, string keyValue)
        {
            var Coll = Cosmos_db.GetCollection<T>(table);
            var filter =  Builders<T>.Filter.Eq(keyName, keyValue);
            var result = await Coll.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
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
                return false;
            }
        }

        public async Task<bool> UpdateOne<T>(string table, T updatedRecord) where T : IMongoRecord
        {
                var delResult = await DeleteAsync<T>(table, "Id", updatedRecord.Id);
                if (!delResult) return false;
                await InsertAsync(table, updatedRecord);
                return true;
        }
    }
}