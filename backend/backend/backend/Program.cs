using backend.Models;
using backend.Models.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{ 
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddCors(o => o.AddPolicy("AllowWebapp", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));


    // Add context
    builder.Services.AddDbContext<AplicationDbContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"));
    });

    // Automapper
    builder.Services.AddAutoMapper(typeof(Program));

    // Add Services
    builder.Services.AddScoped < ITaskRepository, TaskRepository>();
}




var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseCors("AllowWebapp");
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
