
using System.Text.Json.Serialization;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlite("Data Source=carIssuesDatabase.db"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>(opt =>
{
    opt.Password = new PasswordOptions
    {
        RequireDigit = false,
        RequiredUniqueChars = 0,
        RequireNonAlphanumeric = false,
        RequireUppercase = false,
        RequireLowercase = false,
    };
}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.MapIdentityApi<ApplicationUser>();
app.MapControllers();
app.Run();

