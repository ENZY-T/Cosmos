﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos
{
    public interface IAuthenticationServices
    {
        List<UserModel> AuthLogin();
    }
}