using EduBot.Api.Infrastructure;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Modules.School.Features.Classrooms;

public record UpdateClassroomRequest(GradeLevelEnum GradeLevelEnum, string Name);

public record UpdateClassroomCommand(Guid Id, GradeLevelEnum GradeLevelEnum, string Name)
    : IRequest<Result<UpdateClassroomResponseDto>>;

public record UpdateClassroomResponseDto(Guid Id, GradeLevelEnum GradeLevelEnum, string Name);

public class UpdateClassroomCommandValidator : AbstractValidator<UpdateClassroomCommand>
{
    public UpdateClassroomCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty();
        RuleFor(c => c.GradeLevelEnum).IsInEnum();
    }
}

public class UpdateClassroomHandler(ApplicationDbContext context)
    : IRequestHandler<UpdateClassroomCommand, Result<UpdateClassroomResponseDto>>
{
    public async Task<Result<UpdateClassroomResponseDto>> Handle(
        UpdateClassroomCommand request,
        CancellationToken cancellationToken
    )
    {
        var classroom = await context.Classrooms.FirstOrDefaultAsync(
            c => c.Id == request.Id,
            cancellationToken
        );
        if (classroom == null)
        {
            return Result<UpdateClassroomResponseDto>.NotFound("Classroom Not Found");
        }

        var isClassroomExist = await context.Classrooms.AnyAsync(
            c =>
                c.GradeLevelEnum == request.GradeLevelEnum
                && c.Name.Trim().ToLower() == request.Name.Trim().ToLower()
                && c.Id != request.Id,
            cancellationToken
        );

        if (isClassroomExist)
        {
            return Result<UpdateClassroomResponseDto>.Failure("Classroom Is Already Exist");
        }

        classroom.Name = request.Name.Trim();
        classroom.GradeLevelEnum = request.GradeLevelEnum;

        await context.SaveChangesAsync(cancellationToken);

        var response = new UpdateClassroomResponseDto(
            request.Id,
            request.GradeLevelEnum,
            request.Name.Trim()
        );

        return Result<UpdateClassroomResponseDto>.Success(
            response,
            "Classroom Updated Successfully"
        );
    }
}
