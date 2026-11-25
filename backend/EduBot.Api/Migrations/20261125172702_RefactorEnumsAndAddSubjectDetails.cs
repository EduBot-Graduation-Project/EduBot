using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBot.Api.Migrations
{
    /// <inheritdoc />
    public partial class RefactorEnumsAndAddSubjectDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GradeLevel",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "SessionState",
                table: "Sessions",
                newName: "SessionStateEnum");

            migrationBuilder.RenameColumn(
                name: "LessonStatus",
                table: "Lessons",
                newName: "LessonStatusEnum");

            migrationBuilder.RenameColumn(
                name: "EmotionType",
                table: "LessonChunks",
                newName: "EmotionTypeEnum");

            migrationBuilder.RenameColumn(
                name: "ChunkType",
                table: "LessonChunks",
                newName: "ChunkTypeEnum");

            migrationBuilder.AddColumn<string>(
                name: "GradeLevelEnum",
                table: "Subjects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TermEnum",
                table: "Subjects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GradeLevelEnum",
                table: "Classrooms",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GradeLevelEnum",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "TermEnum",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "GradeLevelEnum",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "SessionStateEnum",
                table: "Sessions",
                newName: "SessionState");

            migrationBuilder.RenameColumn(
                name: "LessonStatusEnum",
                table: "Lessons",
                newName: "LessonStatus");

            migrationBuilder.RenameColumn(
                name: "EmotionTypeEnum",
                table: "LessonChunks",
                newName: "EmotionType");

            migrationBuilder.RenameColumn(
                name: "ChunkTypeEnum",
                table: "LessonChunks",
                newName: "ChunkType");

            migrationBuilder.AddColumn<string>(
                name: "GradeLevel",
                table: "Classrooms",
                type: "text",
                nullable: true);
        }
    }
}
