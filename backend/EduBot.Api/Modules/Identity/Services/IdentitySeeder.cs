using System;
using EduBot.Api.Modules.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace EduBot.Api.Modules.Identity.Services;

public static class IdentitySeeder
{
    public static async Task SeedRolesAsync(RoleManager<IdentityRole<Guid>> roleManager)
    {
        string[] roles = ["Admin", "Teacher", "Student"];

        foreach (var role in roles)
        {
            var roleExist = await roleManager.RoleExistsAsync(role);

            if (!roleExist)
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }
    }

    public static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager)
    {
        var IsAdminExist = await userManager.FindByEmailAsync("admin@edubot.com");
        if (IsAdminExist == null)
        {
            var adminUser = new ApplicationUser
            {
                Email = "admin@edubot.com",
                UserName = "admin@edubot.com",
                EmailConfirmed = true,
            };

            var result = await userManager.CreateAsync(adminUser, "@EduBot123");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}
