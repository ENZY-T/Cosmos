using Cosmos.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment env;
        // Absolute path to uploads directory
        private readonly string RootUploadsPath;
        private readonly string UploadsDir = "uploaded_files";
        private readonly Dictionary<string, string> DirTree;

        public FileService(IWebHostEnvironment env)
        {
            this.env = env;

            // Initializing the Root directory
            RootUploadsPath = Path.Combine(env.WebRootPath, UploadsDir);
            FileInfo rootInfo = new FileInfo(RootUploadsPath);
            DirectoryInfo rootDirInfo = new DirectoryInfo(rootInfo.FullName);
            if (!rootDirInfo.Exists) rootDirInfo.Create();

            // Directory tree
            DirTree = new Dictionary<string, string>();
            // Name, Directory
            DirTree.Add("ARTICLES", "articles");
            DirTree.Add("PROJECTS", "projects");
            DirTree.Add("USERS", "users");

            //----------------------


            // Initializing the sub directories
            foreach (var key in DirTree.Keys)
            {
                DirectoryInfo dirInfo = new DirectoryInfo(Path.Combine(RootUploadsPath, DirTree[key]));
                if (!dirInfo.Exists) dirInfo.Create();
            }
        }

        /// <summary>
        /// Delete all the files that are given as a URI List.
        /// Used to deleted all the related media files when a DB record is deleted
        /// </summary>
        /// <param name="uriList">List of file URIs as a List object</param>
        /// <returns></returns>
        public bool DeleteFilesinLocalFS(List<string> uriList)
        {
            bool anyErrorFound = false;
            if (uriList == null) return false;

            foreach (string uri in uriList)
            {
                try
                {
                    // Path.Combine behaves unusually... Not working here. Check out later
                    string absPath = env.WebRootPath + uri;
                    File.Delete(absPath);
                }
                catch (Exception ex)
                {
                    anyErrorFound = true;
                }

            }
            if (anyErrorFound) return false; else return true;
        }

        /// <summary>
        /// Takes the file as the argument and saves the file asynchronously in "WEBROOT/uploaded_files" folder.
        /// </summary>
        /// <param name="files">File to be saved</param>
        /// <param name="dirKey">string key of the DirTree Eg: "PROJECTS"</param>
        /// <returns>List of URI's of the saved files</returns>
        public async Task<List<string>> WriteToFileinLocalFS(List<IFormFile> files, string dirKey)
        {
            if (files != null)
            {
                List<string> savedURIs = new List<string>();
                foreach (var file in files)
                {
                    if (file.Length <= 0) continue;
                    //Unique name for file
                    string uniqueFileName = $"{file.FileName}_{files.IndexOf(file).ToString()}_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}{new FileInfo(file.FileName).Extension}";
                    // URI of file
                    string relativePath = Path.Combine(UploadsDir, DirTree[dirKey.ToUpper()], uniqueFileName);

                    string uri = Path.Combine(env.WebRootPath, relativePath);
                    //Writing to the file
                    using (var fs = new FileStream(uri, FileMode.Create))
                    {
                        try
                        {
                            await file.CopyToAsync(fs);
                        }
                        catch (Exception ex)
                        {
                            return null;
                        }
                    }
                    savedURIs.Add($"\\{relativePath}");
                }
                return savedURIs;
            }
            return null;
        }
    }
}
