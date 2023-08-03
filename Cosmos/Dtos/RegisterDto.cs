using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos.Models
{
    public class RegisterDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Email { get; set; }

        public string Name { get; set; }
        public string Password { get; set; }
    }
}