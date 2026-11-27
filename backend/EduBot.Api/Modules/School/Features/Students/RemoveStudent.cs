using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Students;

public record RemoveStudentCommand(Guid Id) : IRequest<Result>;

public class RemoveStudentHandler(ApplicationDbContext context)
    : IRequestHandler<RemoveStudentCommand, Result>
{
    public async Task<Result> Handle(
        RemoveStudentCommand request,
        CancellationToken cancellationToken
    )
    {
        var student = await context.Students.FirstOrDefaultAsync(
            s => s.Id == request.Id,
            cancellationToken
        );

        if (student == null)
        {
            return Result.NotFound("Student Not Found");
        }

        context.Students.Remove(student);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success("Student Removed Successfully");
    }
}
