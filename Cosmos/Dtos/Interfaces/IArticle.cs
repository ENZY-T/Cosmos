using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Dtos.Interfaces
{
    interface IArticle
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public string Media { get; set; }
    }
}
