using EduBot.Api.Modules.Curriculum.Entities;
using EduBot.Api.Modules.Identity.Entities;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Relations
        modelBuilder.Entity<Session>().HasOne<Lesson>().WithMany().HasForeignKey(s => s.LessonId);

        // Change Enums To String Not Nums
        modelBuilder.Entity<Session>().Property(s => s.SessionState).HasConversion<string>();
        modelBuilder.Entity<Lesson>().Property(l => l.LessonStatus).HasConversion<string>();
    }
}