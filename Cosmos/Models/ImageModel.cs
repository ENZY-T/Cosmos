using Cosmos.Services.Interfaces;

namespace Cosmos.Models
{
    public class ImageModel : IFile
    {
        public int Id { get; set; }
        public string Uri { get; set; }
        public string Description { get; set; }
    }
}