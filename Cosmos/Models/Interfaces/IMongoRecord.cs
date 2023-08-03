using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cosmos.Models.Interfaces
{
    public interface IMongoRecord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}