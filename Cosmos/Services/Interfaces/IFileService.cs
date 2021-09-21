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

        /// <summary>
        /// Delete all the files that are given as a URI List.
        /// Used to deleted all the related media files when a DB record is deleted
        /// </summary>
        /// <param name="uriList">List of file URIs as a List object</param>
        /// <returns>True if success in deletion OR input List is null or empty. <br/>
        /// False if error encountered</returns>
        Task<bool> DeleteFilesinLocalFSAsync(List<string> uriList);

        Task<bool> DeleteAll(string KeyToDir);

        /// <summary>
        /// Checking whether each of new incoming URIs match with a existing URI and if not each corresponding file should be deleted in the file system
        /// </summary>
        /// <param name="oldUriList"></param>
        /// <param name="newUriList"></param>
        /// <returns></returns>
        bool CleanURIs(List<string> oldUriList, List<string> newUriList);
    }
}
