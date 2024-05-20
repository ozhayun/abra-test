namespace PetsApi.Models;

public class PetsDataBaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string PetsCollectionName { get; set; } = null!;
}