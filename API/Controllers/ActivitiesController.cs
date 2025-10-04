using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await context.Activities.ToListAsync();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound();
        return Ok(activity);
    }
}
