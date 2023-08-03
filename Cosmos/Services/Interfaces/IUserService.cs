using MongoDB.Bson;
using Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public interface IUserService
    {
        Task<UserModel> Create(UserModel user);
        Task<UserModel> GetById(string objectIdStr);
        UserModel GetByEmail(string email);

        Task<UserModel> ThirdPartySignIn(UserModel user);
    }
}