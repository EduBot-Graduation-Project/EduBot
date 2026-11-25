namespace EduBot.Api.Modules.Curriculum.Entities;

public class Subject
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }

    // Relation Between
    public ICollection<Lesson> Lessons { get; set; } = [];
}
