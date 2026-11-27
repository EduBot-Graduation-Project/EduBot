using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Students;

public record GetStudentQuery(Guid Id) : IRequest<Result<StudentDto>>;

public class GetStudent(ApplicationDbContext context)
    : IRequestHandler<GetStudentQuery, Result<StudentDto>>
{
    public async Task<Result<StudentDto>> Handle(
        GetStudentQuery request,
        CancellationToken cancellationToken
    )
    {
        var student = await context
            .Students.AsNoTracking()
            .Where(s => s.Id == request.Id)
            .Select(s => new StudentDto(
                s.Id,
                s.Name,
                s.StudentCode,
                s.ClassroomId,
                s.Classroom.Name
            ))
            .FirstOrDefaultAsync(cancellationToken);
        if (student == null)
        {
            return Result<StudentDto>.NotFound("Student Not Exist");
        }

        return Result<StudentDto>.Success(student, "Student Retrieved Successfully");
    }
}
