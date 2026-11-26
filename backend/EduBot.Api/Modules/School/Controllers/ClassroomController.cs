using EduBot.Api.Modules.School.Features.Classrooms;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Controllers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduBot.Api.Modules.School.Controllers;

[Route("api/classrooms")]
[Authorize(Roles = "Admin")]
public class ClassroomController(ISender sender) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<ApiResponse<CreateClassroomResponseDto>>> CreateClassroomAsync(
        CreateClassroomCommand command, CancellationToken cancellationToken)
    {
        var result = await sender.Send(command, cancellationToken);
        return HandleResult(result);
    }
}