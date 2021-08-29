using MongoDB.Bson;
using CosmosLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public interface IUserService
    {
        UserModel Create(UserModel user);
        UserModel GetbyId(string objectIdStr);
        public UserModel GetbyEmail(string email);
    }
}
