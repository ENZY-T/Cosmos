using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Dtos
{
    [BsonIgnoreExtraElements]
    public class LoggedUserDto
    {
        public string UserId{ get; set; }
        public string Email { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }

    }
}
