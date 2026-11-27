namespace EduBot.Api.Modules.School.Utils;

public static class RandomStudentCode
{
    public static string Generate()
    {
        var year = DateTime.UtcNow.ToString("yy");
        var randomNum = Random.Shared.Next(10000).ToString("D4");

        return $"STU-{year}-{randomNum}";
    }
}