using Cosmos.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Dtos.Intefaces
{
    public interface IAdminItem:ICardBase
    {
        public string Tagline { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public List<IFormFile> Media { get; set; }
        public List<string> MediaURIs { get; set; }
    }
}
