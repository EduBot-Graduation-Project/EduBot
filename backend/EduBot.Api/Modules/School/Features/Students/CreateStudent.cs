using EduBot.Api.Infrastructure;
using EduBot.Api.Modules.School.Entities;
using EduBot.Api.Modules.School.Utils;
using EduBot.Api.Shared.Contracts;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Students;

public record CreateStudentCommand(string Name, Guid ClassroomId) : IRequest<Result<CreateStudentResponseDto>>;

public record CreateStudentResponseDto(Guid Id, string Name, string StudentCode);

public class CreateStudentCommandValidator : AbstractValidator<CreateStudentCommand>
{
    public CreateStudentCommandValidator()
    {
        RuleFor(s => s.Name).NotEmpty();
        RuleFor(s => s.ClassroomId).NotEmpty();
    }
}

public class CreateStudentHandler(ApplicationDbContext context)
    : IRequestHandler<CreateStudentCommand, Result<CreateStudentResponseDto>>
{
    public async Task<Result<CreateStudentResponseDto>> Handle(CreateStudentCommand request,
        CancellationToken cancellationToken)
    {
        var isClassroomExist = await context.Classrooms
            .AnyAsync(c => c.Id == request.ClassroomId, cancellationToken);
        if (!isClassroomExist) return Result<CreateStudentResponseDto>.Failure("The Classroom Not Exist");

        string randomStudentCode;
        bool isStudentExist;

        do
        {
            randomStudentCode = RandomStudentCode.Generate();
            isStudentExist =
                await context.Students.AnyAsync(s => s.StudentCode == randomStudentCode, cancellationToken);
        } while (isStudentExist);


        var student = new Student
        {
            Name = request.Name.Trim(),
            StudentCode = randomStudentCode,
            ClassroomId = request.ClassroomId
        };

        context.Students.Add(student);
        await context.SaveChangesAsync(cancellationToken);

        var response = new CreateStudentResponseDto(student.Id, student.Name, student.StudentCode);

        return Result<CreateStudentResponseDto>.Success(response, "Student Added Successfully");
    }
}