using EduBot.Api.Modules.Sessions.Enums;

namespace EduBot.Api.Modules.Sessions.Entities;

public class Session
{
    public Guid Id { get; set; }
    public int CurrentChunkOrder { get; set; } = 1;
    public SessionStateEnum SessionStateEnum { get; set; } = SessionStateEnum.Ready;

    // Relation With Lesson
    public Guid LessonId { get; set; }

    // Relation With Classroom
    public Guid ClassroomId { get; set; }
}
