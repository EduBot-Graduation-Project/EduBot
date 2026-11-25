using EduBot.Api.Modules.Curriculum.Entities;
using EduBot.Api.Modules.Identity.Entities;
using EduBot.Api.Modules.School.Entities;
using EduBot.Api.Modules.Sessions.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EduBot.Api.Infrastructure;

public class ApplicationDbContext(DbContextOptions options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<LessonChunk> LessonChunks { get; set; }
    public DbSet<LessonPage> LessonPages { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Classroom> Classrooms { get; set; }
    public DbSet<Student> Students { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 1. Cross-Module Relations (Sessions)
        modelBuilder
            .Entity<Session>()
            .HasOne<Lesson>()
            .WithMany()
            .HasForeignKey(s => s.LessonId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder
            .Entity<Session>()
            .HasOne<Classroom>()
            .WithMany()
            .HasForeignKey(s => s.ClassroomId)
            .OnDelete(DeleteBehavior.Restrict);

        // 2. School Module
        modelBuilder
            .Entity<Classroom>()
            .HasMany(c => c.Students)
            .WithOne(s => s.Classroom)
            .HasForeignKey(s => s.ClassroomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Student>().HasIndex(s => s.StudentCode).IsUnique();

        // 3. Curriculum Module
        modelBuilder
            .Entity<Subject>()
            .HasMany(s => s.Lessons)
            .WithOne(l => l.Subject)
            .HasForeignKey(l => l.SubjectId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder
            .Entity<Lesson>()
            .HasMany(l => l.LessonPages)
            .WithOne(lp => lp.Lesson)
            .HasForeignKey(lp => lp.LessonId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder
            .Entity<LessonPage>()
            .HasMany(lp => lp.LessonChunks)
            .WithOne(lc => lc.LessonPage)
            .HasForeignKey(lc => lc.LessonPageId)
            .OnDelete(DeleteBehavior.Cascade);

        // 4. Store Enums as Strings
        modelBuilder.Entity<Session>().Property(s => s.SessionState).HasConversion<string>();
        modelBuilder.Entity<Lesson>().Property(l => l.LessonStatus).HasConversion<string>();
        modelBuilder.Entity<LessonChunk>().Property(lc => lc.ChunkType).HasConversion<string>();
        modelBuilder.Entity<LessonChunk>().Property(lc => lc.EmotionType).HasConversion<string>();
    }
}
