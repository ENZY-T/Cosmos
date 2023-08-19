using System;
using System.Security.Principal;
using Cosmos.Models.Interfaces;

namespace Cosmos.Models
{
    public class ReviewDbModel : BaseMongoRecord
    {
        public int Rating { get; set; }
        public string? AuthorName { get; set; }
        public string AuthorEmail { get; set; }
        public string AuthorRole { get; set; }
        public string? Comment { get; set; }
        public string ProjectId { get; set; }
    }
}