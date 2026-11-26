using EduBot.Api.Modules.Curriculum.Enums;

namespace EduBot.Api.Modules.Curriculum.Entities;

public class Lesson
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public LessonStatusEnum LessonStatusEnum { get; set; } = LessonStatusEnum.Uploaded;
    public int OrderIndex { get; set; } // Order Of Lesson From Curriculum
    public string FileUrl { get; set; } = string.Empty;

    // Relation With Subject
    public Guid SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;

    // Relation With LessonPage
    public ICollection<LessonPage> LessonPages { get; set; } = [];
}
