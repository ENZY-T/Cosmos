﻿using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Models
{
    public class ProjectModel_Full
    {        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public List<string> MediaURIs { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
