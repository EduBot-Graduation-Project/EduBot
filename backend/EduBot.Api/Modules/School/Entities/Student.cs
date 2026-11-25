namespace EduBot.Api.Modules.School.Entities;

public class Student
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string StudentCode { get; set; }

    // Relation
    public Guid ClassroomId { get; set; }
    public Classroom Classroom { get; set; } = null!;
}
