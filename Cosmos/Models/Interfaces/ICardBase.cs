using Cosmos.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Models.Interfaces
{
    public interface ICardBase
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
