using EduBot.Api.Infrastructure;
using EduBot.Api.Modules.School.Entities;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Classrooms;

// Create Classroom Command
public record CreateClassroomCommand(GradeLevelEnum GradeLevelEnum, string Name)
    : IRequest<Result<CreateClassroomResponseDto>>;

// Create Classroom Response
public record CreateClassroomResponseDto(Guid Id, GradeLevelEnum GradeLevelEnum, string Name);

// Create Classroom Validator
public class CreateClassroomCommandValidator : AbstractValidator<CreateClassroomCommand>
{
    public CreateClassroomCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty();
        RuleFor(c => c.GradeLevelEnum).IsInEnum();
    }
}

// Create Classroom Handler
public class CreateClassroomHandler(ApplicationDbContext context)
    : IRequestHandler<CreateClassroomCommand, Result<CreateClassroomResponseDto>>
{
    public async Task<Result<CreateClassroomResponseDto>> Handle(CreateClassroomCommand request,
        CancellationToken cancellationToken)
    {
        // Check If There Is Classroom With Same Name And Grade
        var isClassroomExist = await context.Classrooms.AnyAsync(c =>
                c.GradeLevelEnum == request.GradeLevelEnum && c.Name.ToLower() == request.Name.Trim().ToLower(),
            cancellationToken);

        if (isClassroomExist) return Result<CreateClassroomResponseDto>.Failure("The Classroom Is Already Exist");

        var newClassroom = new Classroom
        {
            Name = request.Name.Trim(),
            GradeLevelEnum = request.GradeLevelEnum
        };

        context.Classrooms.Add(newClassroom);
        await context.SaveChangesAsync(cancellationToken);

        var response = new CreateClassroomResponseDto(newClassroom.Id, newClassroom.GradeLevelEnum, newClassroom.Name);

        return Result<CreateClassroomResponseDto>.Success(response, "Classroom Created Successfully.");
    }
}