namespace EduBot.Api.Modules.Curriculum.Entities;

public class LessonChunk
{
    public Guid Id { get; set; }
    public int OrderIndex { get; set; }
    public required string SpeechText { get; set; }
    public required string BoardText { get; set; }

    // Relation Between Lesson and Lesson Chunks 1 => M
    public Guid LessonId { get; set; }
    public Lesson Lesson { get; set; } = null!;
}
