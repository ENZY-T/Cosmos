using MongoDB.Bson;
using CosmosLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class UserService : IUserService
    {
        private readonly IDbClient _dbClient;

        public UserService(IDbClient dbClient)
        {
            _dbClient = dbClient;
        }
        public UserModel Create(UserModel user)
        {
            return _dbClient.INSERT<UserModel>("Users", user);
        }

        public UserModel GetbyId(string objectIdStr)
        {
            ObjectId objectId = new ObjectId(objectIdStr);
            return _dbClient.GETbyId<UserModel>("Users", objectId);
        }

        public UserModel GetbyEmail(string email)
        {
            return _dbClient.GETbyAny<UserModel>("Users", "Email", email).FirstOrDefault();
        }
    }
}
