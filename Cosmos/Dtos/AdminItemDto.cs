using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Models
{
    [BsonIgnoreExtraElements]
    public class AdminItemDto 
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public List<IFormFile> Media { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
