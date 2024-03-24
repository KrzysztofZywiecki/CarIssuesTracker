
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("user")]
public class UserController(CarIssueContext carIssueContext) : ControllerBase
{
    private readonly CarIssueContext carIssueContext = carIssueContext;

    [HttpGet("all")]
    public async Task<User[]> GetUsers()
    {
        var users = await carIssueContext.Users.ToArrayAsync();
        return users;
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<UserDTO>> GetUser(long Id)
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

    [HttpPost]
    public async Task<UserDTO> CreateUser(CreateUserDTO createUserDTO)
    {
        var user = new User(Id: 0, Username: createUserDTO.Username, Cars: []);

        await carIssueContext.Users.AddAsync(user);
        await carIssueContext.SaveChangesAsync();

        return new UserDTO(user);
    }
}