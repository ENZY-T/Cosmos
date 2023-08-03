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
        #region Initialization

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

        #endregion

        public async Task<bool> CleanURIs(List<string> oldUriList, List<string> newUriList)
        {
            List<string> urisToDelete = new List<string>();
            oldUriList.ForEach(oldUri =>
            {
                // Getting old URI to be cleaned
                if (!newUriList.Any(newUri => newUri == oldUri))
                {
                    urisToDelete.Add(oldUri);
                }
            });

            try
            {
                foreach (var uri in urisToDelete)
                {
                    await DeleteFileByUri(uri);
                }

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAll(string KeyToDir)
        {
            try
            {
                string absPath = Path.Combine(RootUploadsPath, DirTree[KeyToDir]);
                DirectoryInfo dirInfo = new DirectoryInfo(absPath);
                await Task.Run(() => dirInfo.GetFiles().ToList().ForEach(file => file.Delete()));
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }


        public async Task<bool> DeleteFilesByUris(List<string> uris)
        {
            var anyErrorFound = false;

            // If the URI list is null it is OK to give success on deletion since no media exists. Therefore clean
            if (uris == null || uris?.Count < 1) return true;

            foreach (var uri in uris)
            {
                try
                {
                    // Path.Combine behaves unusually... Not working here. Check out later
                    await DeleteFileByUri(uri);
                }
                catch (Exception ex)
                {
                    anyErrorFound = true;
                }
            }

            return !anyErrorFound;
        }

        public async Task<List<string>> WriteToFileinLocalFS(List<IFormFile> files, string dirKey)
        {
            if (files != null || files?.Count < 1)
            {
                List<string> savedURIs = new List<string>();
                foreach (var file in files)
                {
                    if (file.Length <= 0) continue;
                    //Unique name for file
                    string uniqueFileName =
                        $"{file.FileName}_{files.IndexOf(file).ToString()}_{DateTime.Now.ToString("yyyyMMdd_HHmmss")}{new FileInfo(file.FileName).Extension}";
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
            else return new List<string>();
        }

        public async Task DeleteFileByUri(string uri)
        {
            var absPath = env.WebRootPath + uri;
            await Task.Run(() => File.Delete(absPath));
        }

        public bool IsFileExist(string Uri)
        {
            var absPath = Path.Combine(env.WebRootPath, Uri);
            var fileInfo = new FileInfo(absPath);

            return fileInfo.Exists;
        }
    }
}