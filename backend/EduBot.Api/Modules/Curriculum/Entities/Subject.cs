using EduBot.Api.Modules.Curriculum.Enums;
using EduBot.Api.Shared.Enums;

namespace EduBot.Api.Modules.Curriculum.Entities;

public class Subject
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public GradeLevelEnum GradeLevelEnum { get; set; }
    public TermEnum TermEnum { get; set; }

    // Relation Between
    public ICollection<Lesson> Lessons { get; set; } = [];
}
