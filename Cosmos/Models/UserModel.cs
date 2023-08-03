using MongoDB.Bson;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Cosmos
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Email { get; set; }

        // For third party sign ups
        [JsonIgnore] public string ExternalId { get; set; }
        public string ExternalType { get; set; }
        [JsonIgnore] public string Password { get; set; }
        public string Role { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
    }
}