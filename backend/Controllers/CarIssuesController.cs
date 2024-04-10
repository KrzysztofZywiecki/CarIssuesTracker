using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("cars/{CarId}/issues")]
[Authorize]
public class CarIssuesController(ICarIssuesService carIssuesService) : ControllerBase
{

    private readonly ICarIssuesService carIssuesService = carIssuesService;

    [HttpGet]
    public async Task<ActionResult<CarIssueDTO[]>> GetCarIssues([FromRoute] Guid CarId)
    {
        var issues = await carIssuesService.GetCarIssues(User, CarId);
        return Ok(issues);
    }

    [HttpPost]
    public async Task<ActionResult<CarIssueDTO>> CreateNewIssue([FromRoute] Guid CarId, [FromBody] CreateCarIssueDTO createCarIssueDTO)
    {
        return Created("", await carIssuesService.CreateCarIssue(User, CarId, createCarIssueDTO));
    }

    [HttpPut]
    [Route("{IssueId}")]
    public async Task<ActionResult<CarIssueDTO>> UpdateCarIssue([FromRoute] Guid CarId, [FromRoute] Guid IssueId, [FromBody] UpdateCarIssueDTO carIssueDTO)
    {
        if (carIssueDTO.RepairCost is not null && carIssueDTO.RepairDateTime is not null)
        {
            return Ok(await carIssuesService.UpdateCarIssue(User, CarId, IssueId, carIssueDTO));
        }
        else
        {
            return BadRequest("Both repair cost and date must not be null");
        }
    }

    [HttpDelete]
    [Route("{IssueId}")]
    public async Task<ActionResult<CarIssueDTO>> RemoveCarIssue([FromRoute] Guid CarId, [FromRoute] Guid IssueId)
    {
        await carIssuesService.RemoveCarIssue(User, CarId, IssueId);
        return NoContent();
    }
}