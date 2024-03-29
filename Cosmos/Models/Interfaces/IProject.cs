﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Models.Interfaces
{
    public interface IProject : ICardBase
    {
        public string Tagline { get; set; }
        public string Description { get; set; }
        public string MediaType { get; set; }
        public List<ImageModel> Images { get; set; }
    }
}