using EduBot.Api.Modules.Curriculum.Enums;

namespace EduBot.Api.Modules.Curriculum.Entities;

public class Lesson
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public LessonStatus LessonStatus { get; set; } = LessonStatus.Processing;

    // Relation With Lesson Chunks
    public ICollection<LessonChunk> Chunks { get; set; } = [];
}
