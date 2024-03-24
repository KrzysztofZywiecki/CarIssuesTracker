using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

[Route("car")]
public class CarController(CarIssueContext carIssueContext) : ControllerBase
{
    private readonly CarIssueContext carIssueContext = carIssueContext;

    [HttpPost]
    public async Task<ActionResult<CarDTO>> AddCar(CreateCarDTO createCarDTO)
    {
        var user = await carIssueContext.Users.Include(x => x.Cars)
            .FirstOrDefaultAsync(x => x.Id == createCarDTO.OwnerId);

        if (user != null)
        {
            var car = new Car(0, createCarDTO.Name, []);
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