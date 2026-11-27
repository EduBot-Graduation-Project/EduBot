using EduBot.Api.Modules.School.Features.Students;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Controllers;
using EduBot.Api.Shared.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduBot.Api.Modules.School.Controllers;

[Route("api/students")]
[Authorize(Roles = "Admin")]
public class StudentsController(ISender sender) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<ApiResponse<CreateStudentResponseDto>>> CreateStudentAsync(
        CreateStudentCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(command, cancellationToken);
        return HandleResult(result);
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<StudentDto>>>> GetAllStudentsAsync(
        [FromQuery] GradeLevelEnum? gradeLevelEnum,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(new GetAllStudentsQuery(gradeLevelEnum), cancellationToken);
        return HandleResult(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<StudentDto>>> GetStudentAsync(
        [FromRoute] Guid id,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(new GetStudentQuery(id), cancellationToken);
        return HandleResult(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<StudentDto>>> UpdateStudentAsync(
        [FromRoute] Guid id,
        [FromBody] UpdateStudentRequest request,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(
            new UpdateStudentCommand(id, request.Name, request.ClassroomId),
            cancellationToken
        );
        return HandleResult(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> RemoveStudentAsync(
        [FromRoute] Guid id,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(new RemoveStudentCommand(id), cancellationToken);
        return HandleResult(result);
    }
}
