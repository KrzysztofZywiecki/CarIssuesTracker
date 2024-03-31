using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers;

[Route("/car")]
[Authorize]
public class CarController(ApplicationDbContext carIssueContext, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;
    private readonly UserManager<ApplicationUser> userManager = userManager;

    [HttpPost]
    public async Task<ActionResult<CarDTO>> AddCar(CreateCarDTO createCarDTO)
    {
        var userId = userManager.GetUserId(User);
        if (userId is null)
        {
            return Unauthorized();
        }

        var user = await carIssueContext.Users.Include(x => x.Cars).FirstOrDefaultAsync(x => x.Id == userId);

        if (user != null)
        {
            var car = new Car { Name = createCarDTO.Name };
            user.Cars.Add(car);
            await carIssueContext.SaveChangesAsync();
            return Ok(car);
        }
        else
        {
            return NotFound();
        }
    }

    [Route("{Id}")]
    [HttpGet]
    public async Task<ActionResult<CarDTO>> GetCar(long Id)
    {
        var car = await carIssueContext.Cars.FindAsync(Id);
        if (car != null)
        {
            return new CarDTO(car);
        }
        else
        {
            return NotFound();
        }
    }
}