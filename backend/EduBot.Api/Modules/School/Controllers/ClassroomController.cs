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
        CreateClassroomCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(command, cancellationToken);
        return HandleResult(result);
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ClassroomResponseDto>>>> GetClassroomsAsync(
        [FromQuery] GetClassroomsQuery query,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(query, cancellationToken);
        return HandleResult(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UpdateClassroomResponseDto>>> UpdateClassroomAsync(
        [FromRoute] Guid id,
        [FromBody] UpdateClassroomRequest request,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(
            new UpdateClassroomCommand(id, request.GradeLevelEnum, request.Name),
            cancellationToken
        );
        return HandleResult(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> RemoveClassroomAsync(
        [FromRoute] Guid id,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(new RemoveClassroomCommand(id), cancellationToken);
        return HandleResult(result);
    }
}
