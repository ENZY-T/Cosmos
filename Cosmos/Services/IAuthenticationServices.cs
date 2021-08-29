using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosmosLib
{
    public interface IAuthenticationServices
    {
        List<UserModel> AuthLogin();
    }
}
