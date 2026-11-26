using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Classrooms;

public record GetClassroomsQuery(GradeLevelEnum? GradeLevelEnum = null)
    : IRequest<Result<List<ClassroomResponseDto>>>;

public record ClassroomResponseDto(Guid Id, GradeLevelEnum GradeLevelEnum, string Name);

public class GetClassroomsHandler(ApplicationDbContext context)
    : IRequestHandler<GetClassroomsQuery, Result<List<ClassroomResponseDto>>>
{
    public async Task<Result<List<ClassroomResponseDto>>> Handle(
        GetClassroomsQuery request,
        CancellationToken cancellationToken
    )
    {
        var classroomsQuery = context.Classrooms.AsNoTracking();

        if (request.GradeLevelEnum.HasValue)
        {
            classroomsQuery = classroomsQuery.Where(c =>
                c.GradeLevelEnum == request.GradeLevelEnum
            );
        }

        var classrooms = await classroomsQuery
            .OrderBy(c => c.GradeLevelEnum)
            .ThenBy(c => c.Name)
            .Select(c => new ClassroomResponseDto(c.Id, c.GradeLevelEnum, c.Name))
            .ToListAsync(cancellationToken);

        return Result<List<ClassroomResponseDto>>.Success(
            classrooms,
            "Classrooms Retrieved Successfully"
        );
    }
}
