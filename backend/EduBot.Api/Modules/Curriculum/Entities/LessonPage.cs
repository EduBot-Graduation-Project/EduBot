namespace EduBot.Api.Modules.Curriculum.Entities;

public class LessonPage
{
    public Guid Id { get; set; }
    public int PageNumber { get; set; }
    public string? Title { get; set; }

    // Relation With Lesson
    public Guid LessonId { get; set; }
    public Lesson Lesson { get; set; } = null!;

    // Relation With LessonChunks
    public ICollection<LessonChunk> LessonChunks { get; set; } = [];
}
