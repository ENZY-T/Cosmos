namespace Cosmos.Services.Interfaces
{
    public class VideoModel : IFile
    {
        public string Uri { get; set; }
        public string? Description { get; set; }
    }
}