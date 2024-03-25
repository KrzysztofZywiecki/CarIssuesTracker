
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("user")]
public class UserController(ApplicationDbContext carIssueContext) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;

    [HttpGet("all")]
    public async Task<ApplicationUser[]> GetUsers()
    {
        var users = await carIssueContext.Users.Include(x => x.Cars).ToArrayAsync();
        return users;
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<UserDTO>> GetUser(string Id)
    {
        var user = await carIssueContext.Users.FindAsync(Id);

        if (user != null)
        {
            return new UserDTO(user);
        }
        else
        {
            return NotFound();
        }

    }
}