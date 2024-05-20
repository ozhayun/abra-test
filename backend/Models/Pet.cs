using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PetsApi.Models;

public class Pet
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public string Created_At { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Color { get; set; } = null!;

    public decimal Age { get; set; }
}