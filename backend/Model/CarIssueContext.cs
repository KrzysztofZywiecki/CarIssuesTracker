using Backend.Models;
using Microsoft.EntityFrameworkCore;


public class CarIssueContext : DbContext
{
    public CarIssueContext(DbContextOptions<CarIssueContext> options) : base(options) { }

    public DbSet<CarIssue> CarIssues { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Car> Cars { get; set; }
}