using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services.Interfaces
{
    public interface IFileService
    {
        /// <summary>
        /// Takes the file as the argument and saves the file asynchronously in "WEBROOT/uploaded_files" folder.
        /// </summary>
        /// <param name="files">File to be saved</param>
        /// <param name="dirKey">string key of the DirTree Eg: "PROJECTS"</param>
        /// <returns>List of URI's of the saved files on success. <br/>
        /// if the input list empty or null, returns a empty List of Strings.<br/>
        /// On error returns null</returns>
        Task<List<string>> WriteToFileinLocalFS(List<IFormFile> files, string dirKey);

        Task<bool> DeleteAll(string KeyToDir);

        /// <summary>
        /// Checking whether each of new incoming URIs match with an existing URI and if not each corresponding file will be deleted in the file system
        /// </summary>
        /// <param name="oldUriList"></param>
        /// <param name="newUriList"></param>
        /// <returns></returns>
        Task<bool> CleanURIs(List<string> oldUriList, List<string> newUriList);

        /// <summary>
        /// Delete a file by Uri
        /// </summary>
        /// <param name="uri">URI of the file to be deleted</param>
        /// <returns>void Task</returns>
        Task DeleteFileByUri(string uri);

        bool IsFileExist(string Uri);
    }
}