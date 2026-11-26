using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Classrooms;

public record RemoveClassroomCommand(Guid Id) : IRequest<Result>;

public class RemoveClassroomHandler(ApplicationDbContext context)
    : IRequestHandler<RemoveClassroomCommand, Result>
{
    public async Task<Result> Handle(
        RemoveClassroomCommand request,
        CancellationToken cancellationToken
    )
    {
        var classroom = await context.Classrooms.FirstOrDefaultAsync(
            c => c.Id == request.Id,
            cancellationToken
        );

        if (classroom == null)
        {
            return Result.NotFound("Classroom Not Found");
        }

        var isStudentsExist = await context.Students.AnyAsync(
            s => s.ClassroomId == request.Id,
            cancellationToken
        );

        if (isStudentsExist)
        {
            return Result.Failure("Cannot Delete Classroom Because It Has Assigned Students");
        }

        context.Classrooms.Remove(classroom);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success("Classroom Removed Successfully");
    }
}
