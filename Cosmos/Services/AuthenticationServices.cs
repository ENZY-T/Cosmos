using System;
using System.Collections.Generic;

namespace Cosmos
{
    public class AuthenticationServices : IAuthenticationServices
    {
        public List<UserModel> AuthLogin()
        {
            return new List<UserModel>
            {
                new UserModel
                {
                    Email = "Chikz",
                    Password = "Chika",
                    FName = "Chika",
                    Tel = "0771234567",
                    Address = "Banda"
                }
            };
        }
    }
}
