using MongoDB.Bson;
using Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class UserService : IUserService
    {
        private readonly IDbClient _dbClient;
        private readonly IJwtService jwtService;

        public UserService(IDbClient dbClient, IJwtService jwtService)
        {
            _dbClient = dbClient;
            this.jwtService = jwtService;
        }
        public UserModel Create(UserModel user)
        {
            return _dbClient.Insert<UserModel>("Users", user);
        }

        public UserModel GetbyId(string objectIdStr)
        {

            return _dbClient.GetbyId<UserModel>("Users", objectIdStr);
        }

        public UserModel GetbyEmail(string email)
        {
            return _dbClient.GetbyAny<UserModel>("Users", "Email", email).FirstOrDefault();
        }

        public UserModel ThirdPartySignIn(UserModel user)
        {
            // Get the user if there's one matching the external id and type
            var registeredUser = _dbClient.GetbyAny<UserModel>("Users", "ExternalId", user.ExternalId).FirstOrDefault(u => u.ExternalType == user.ExternalType);

            // Register the user if there's none
            if (registeredUser == null)
            {
                return Create(user);
            }
            // If user found, login and respond with jwt at the controller
            else
            {
                return registeredUser;
            }
        }

        
        private string CreateUniqueUsername(UserModel user)
        {
            // Username not implemented yet. Implement it before calling the function and remove the exeption when done
            throw new NotImplementedException();
            string firstPart = user.Email.Split('@').First();
            var random = new Random();
            string username = firstPart + random;

            while (_dbClient.GetbyAny<UserModel>("Users", "Username", username).Any())
            {
                username = username + random.Next(1000000);
            }
            return username;
        }
    }
}
