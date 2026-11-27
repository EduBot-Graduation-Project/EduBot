using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Students;

public record UpdateStudentRequest(string Name, Guid ClassroomId);

public record UpdateStudentCommand(Guid Id, string Name, Guid ClassroomId)
    : IRequest<Result<StudentDto>>;

public class UpdateStudentCommandValidator : AbstractValidator<UpdateStudentCommand>
{
    public UpdateStudentCommandValidator()
    {
        RuleFor(s => s.Id).NotEmpty();
        RuleFor(s => s.Name).NotEmpty();
        RuleFor(s => s.ClassroomId).NotEmpty();
    }
}

public class UpdateStudentHandler(ApplicationDbContext context)
    : IRequestHandler<UpdateStudentCommand, Result<StudentDto>>
{
    public async Task<Result<StudentDto>> Handle(
        UpdateStudentCommand request,
        CancellationToken cancellationToken
    )
    {
        var student = await context.Students.FirstOrDefaultAsync(
            s => s.Id == request.Id,
            cancellationToken
        );

        if (student == null)
        {
            return Result<StudentDto>.NotFound("Student Not Found");
        }

        var studentClassroom = await context
            .Classrooms.Where(c => c.Id == request.ClassroomId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
        if (studentClassroom == null)
        {
            return Result<StudentDto>.NotFound("Classroom Not Found");
        }

        student.Name = request.Name.Trim();
        student.ClassroomId = request.ClassroomId;

        await context.SaveChangesAsync(cancellationToken);

        var result = new StudentDto(
            student.Id,
            student.Name,
            student.StudentCode,
            student.ClassroomId,
            studentClassroom
        );

        return Result<StudentDto>.Success(result, "Student Data Updated Successfully");
    }
}
