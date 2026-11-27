using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Students;

public record GetAllStudentsQuery(GradeLevelEnum? GradeLevelEnum = null)
    : IRequest<Result<List<StudentDto>>>;

public record StudentDto(
    Guid Id,
    string Name,
    string StudentCode,
    Guid ClassroomId,
    string ClassroomName
);

public class GetAllStudents(ApplicationDbContext context)
    : IRequestHandler<GetAllStudentsQuery, Result<List<StudentDto>>>
{
    public async Task<Result<List<StudentDto>>> Handle(
        GetAllStudentsQuery request,
        CancellationToken cancellationToken
    )
    {
        var studentsQuery = context.Students.AsNoTracking();

        if (request.GradeLevelEnum.HasValue)
        {
            studentsQuery = studentsQuery.Where(s =>
                s.Classroom.GradeLevelEnum == request.GradeLevelEnum
            );
        }

        var students = await studentsQuery
            .OrderBy(s => s.Classroom.GradeLevelEnum)
            .ThenBy(s => s.Name)
            .Select(s => new StudentDto(
                s.Id,
                s.Name,
                s.StudentCode,
                s.ClassroomId,
                s.Classroom.Name
            ))
            .ToListAsync(cancellationToken);

        return Result<List<StudentDto>>.Success(students, "Students Retrieved Successfully");
    }
}
