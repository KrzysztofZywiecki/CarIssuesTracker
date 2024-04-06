using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("issues")]
[Authorize]
public class CarIssuesController(ApplicationDbContext carIssueContext) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;

    [HttpPost]
    [Route("{CarId}")]
    public async Task<ActionResult<CarIssueDTO>> CreateNewIssue([FromRoute] Guid CarId, [FromBody] CreateCarIssueDTO createCarIssueDTO)
    {
        var car = await carIssueContext.Cars.Include(x => x.Issues).FirstAsync(x => x.Id == CarId);
        if (car != null)
        {
            var issue = new CarIssue()
            {
                Description = createCarIssueDTO.Description,
                CreateDateTime = DateTime.Now
            };

            car.Issues.Add(issue);

            return Ok(new CarIssueDTO(issue));
        }
        else
        {
            return NotFound();
        }
    }
}