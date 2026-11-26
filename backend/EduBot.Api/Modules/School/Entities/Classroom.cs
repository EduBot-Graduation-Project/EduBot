using EduBot.Api.Shared.Enums;

namespace EduBot.Api.Modules.School.Entities;

public class Classroom
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public GradeLevelEnum GradeLevelEnum { get; set; }
    public ICollection<Student> Students { get; set; } = [];

    // There Is Realtion Between Classroom and Session But Not Made Navigation Because Different Modules!
}
