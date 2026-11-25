using EduBot.Api.Modules.Curriculum.Enums;

namespace EduBot.Api.Modules.Curriculum.Entities;

public class LessonChunk
{
    public Guid Id { get; set; }
    public int OrderIndex { get; set; }
    public required string SpeechText { get; set; }
    public required string BoardText { get; set; }
    public string? ImageUrl { get; set; }
    public ChunkTypeEnum ChunkTypeEnum { get; set; }
    public EmotionTypeEnum EmotionTypeEnum { get; set; }

    // Relation Between Lesson Page and Lesson Chunks 1 => M
    public Guid LessonPageId { get; set; }
    public LessonPage LessonPage { get; set; } = null!;
}
