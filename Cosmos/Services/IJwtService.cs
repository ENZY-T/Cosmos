using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public interface IJwtService
    {
        string Generate(string id);
        JwtSecurityToken Verify(string jwt);
    }

}

