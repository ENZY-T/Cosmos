using System.Collections.Generic;
using Cosmos.Models.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Cosmos.Dtos.Interfaces
{
    public interface IAdminItem : ICardBase
    {
        public string Tagline { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public List<IFormFile> Media { get; set; }
        public List<string> MediaDescriptions { get; set; }
    }
}