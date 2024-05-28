using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Utilities
{
    public class JwtService : IJwtService
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private AppSettings AppSettings { get; }

        public JwtService(AppSettings appSettings,UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration)
        {
            AppSettings = appSettings;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); // ตัวจัดการโทเค็น

            var key = Encoding.ASCII
            .GetBytes(_configuration.GetSection("JWTSettings").GetSection("securityKey").Value!); // ดึงค่า securityKey จากการตั้งค่า

            var roles = _userManager.GetRolesAsync(user).Result; 

            List<Claim> claims =
            new List<Claim> // สร้างรายการของ Claims
            {
                new (JwtRegisteredClaimNames.Email,user.Email ?? ""),
                new (JwtRegisteredClaimNames.Name,user.Firstname ?? ""),
                new (JwtRegisteredClaimNames.NameId,user.Id ?? ""),
                new (JwtRegisteredClaimNames.Aud,
                _configuration.GetSection("JWTSettings").GetSection("ValidAudience").Value!),
                new (JwtRegisteredClaimNames.Iss,_configuration.GetSection("JWTSettings").GetSection("ValidIssuer").Value!)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims), // กำหนด Claims ให้กับโทเค็น
                Expires = DateTime.UtcNow.AddDays(1), // กำหนดวันหมดอายุของโทเค็น
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256 // กำหนดการเข้ารหัสโทเค็นด้วย HMAC SHA256
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor); // สร้างโทเค็น

            return tokenHandler.WriteToken(token);
        }
    }
}