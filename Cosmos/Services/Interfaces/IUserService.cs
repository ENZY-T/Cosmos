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
        UserModel Create(UserModel user);
        UserModel GetbyId(string objectIdStr);
        UserModel GetbyEmail(string email);

        UserModel ThirdPartySignIn(UserModel user);
    }
}
