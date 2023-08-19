using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Serialization;

namespace Cosmos.Dtos
{
    public class ReviewDto
    {
        public string? Id { get; set; }
        public int Rating { get; set; }
        public string? AuthorName { get; set; }
        [Required]
        public string AuthorEmail { get; set; }
        [Required]
        public string AuthorRole { get; set; }
        public string? Comment { get; set; }
        public string ProjectId { get; set; }
    }
}