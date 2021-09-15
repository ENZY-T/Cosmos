using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services.Interfaces
{
    public interface IFileService
    {
        Task<List<string>> WriteToFileinLocalFS(List<IFormFile> files, string dirKey);
        bool DeleteFilesinLocalFS(List<string> uriList);

    }
}
