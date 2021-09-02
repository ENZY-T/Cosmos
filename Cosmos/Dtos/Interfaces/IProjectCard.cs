using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Dtos.Interfaces
{
    interface IProjectCard
    {
        public string Id { get; set; }
        public string Title {get;set;}
        public string Cover {get;set;}
        public string Description {get;set;}
    }
}
