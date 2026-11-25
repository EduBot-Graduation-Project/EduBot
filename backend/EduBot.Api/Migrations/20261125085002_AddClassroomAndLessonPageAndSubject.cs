using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBot.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddClassroomAndLessonPageAndSubject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonChunks_Lessons_LessonId",
                table: "LessonChunks");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Lessons_LessonId",
                table: "Sessions");

            migrationBuilder.RenameColumn(
                name: "LessonId",
                table: "LessonChunks",
                newName: "LessonPageId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonChunks_LessonId",
                table: "LessonChunks",
                newName: "IX_LessonChunks_LessonPageId");

            migrationBuilder.AddColumn<Guid>(
                name: "ClassroomId",
                table: "Sessions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "FileUrl",
                table: "Lessons",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "SubjectId",
                table: "Lessons",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "ChunkType",
                table: "LessonChunks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmotionType",
                table: "LessonChunks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "LessonChunks",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Classrooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    GradeLevel = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classrooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LessonPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PageNumber = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    LessonId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonPages_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    StudentCode = table.Column<string>(type: "text", nullable: false),
                    ClassroomId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Classrooms_ClassroomId",
                        column: x => x.ClassroomId,
                        principalTable: "Classrooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_ClassroomId",
                table: "Sessions",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_SubjectId",
                table: "Lessons",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonPages_LessonId",
                table: "LessonPages",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_ClassroomId",
                table: "Students",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_StudentCode",
                table: "Students",
                column: "StudentCode",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonChunks_LessonPages_LessonPageId",
                table: "LessonChunks",
                column: "LessonPageId",
                principalTable: "LessonPages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Subjects_SubjectId",
                table: "Lessons",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Classrooms_ClassroomId",
                table: "Sessions",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Lessons_LessonId",
                table: "Sessions",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonChunks_LessonPages_LessonPageId",
                table: "LessonChunks");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Subjects_SubjectId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Classrooms_ClassroomId",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Lessons_LessonId",
                table: "Sessions");

            migrationBuilder.DropTable(
                name: "LessonPages");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Classrooms");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_ClassroomId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_SubjectId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "FileUrl",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "OrderIndex",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "ChunkType",
                table: "LessonChunks");

            migrationBuilder.DropColumn(
                name: "EmotionType",
                table: "LessonChunks");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "LessonChunks");

            migrationBuilder.RenameColumn(
                name: "LessonPageId",
                table: "LessonChunks",
                newName: "LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonChunks_LessonPageId",
                table: "LessonChunks",
                newName: "IX_LessonChunks_LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonChunks_Lessons_LessonId",
                table: "LessonChunks",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Lessons_LessonId",
                table: "Sessions",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
