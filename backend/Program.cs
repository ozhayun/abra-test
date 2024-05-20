using System.ComponentModel;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PetsApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Data Base Connection
builder.Services.Configure<PetsDataBaseSettings>(
    builder.Configuration.GetSection("PetsDataBase"));

builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<PetsDataBaseSettings>>().Value;
    var client = new MongoClient(settings.ConnectionString);
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddSingleton(sp =>
{
    var database = sp.GetRequiredService<IMongoDatabase>();
    var settings = sp.GetRequiredService<IOptions<PetsDataBaseSettings>>().Value;
    return database.GetCollection<Pet>(settings.PetsCollectionName);
});

// Allow front requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/pet", async (Pet newPet, IMongoCollection<Pet> collection) =>
{
    await collection.InsertOneAsync(newPet);
    return Results.Created("Created new pet", newPet);
});

app.MapGet("/api/pets", async (IMongoCollection<Pet> collection) =>
{
    return await collection.Find(_ => true).ToListAsync();
});

app.Run();