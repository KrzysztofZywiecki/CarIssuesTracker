
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("/user")]
public class UserController(CarIssueContext carIssueContext) : ControllerBase
{
    private readonly CarIssueContext carIssueContext = carIssueContext;

    [Route("all")]
    [HttpGet]
    public async Task<User[]> GetUsers()
    {
        var users = await carIssueContext.Users.ToArrayAsync();
        return users;
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