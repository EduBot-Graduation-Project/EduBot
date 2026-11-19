using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EduBot.Api.Modules.Identity.Services;

public class TokenService(IConfiguration configuration)
{
    public string JwtTokenGenerator(List<Claim> claims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"]!));

        var sc = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            audience: configuration["JWT:Audience"],
            issuer: configuration["JWT:Issuer"],
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: sc
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
