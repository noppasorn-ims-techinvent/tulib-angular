using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Dtos;
using backend.Models;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private IJwtService _jwtService;

        public AccountController(UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration, IJwtService jwtService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _jwtService = jwtService;
        }

        // api/account/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Prifix = registerDto.Prifix,
                Email = registerDto.Email,
                Firstname = registerDto.FirstName,
                Lastname = registerDto.LastName,
                UserName = registerDto.Email,
                Telephone = registerDto.Telephone
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (registerDto.Roles is null)
            {
                await _userManager.AddToRoleAsync(user, "User"); // ใส่ Role User เข้าไปตอนเริ่มถ้าไม่ได้ระบุมาตอนแรก
            }
            else
            {
                foreach (var role in registerDto.Roles)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return Ok(new AuthResponseDto
            {
                isSuccess = true,
                Message = "Account Created Successfully!"
            });
        }

        // api/account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null)
            {
                return Unauthorized(new AuthResponseDto
                {
                    isSuccess = false,
                    Message = "User not found with this email"
                });
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
            {
                return Unauthorized(new AuthResponseDto
                {
                    isSuccess = false,
                    Message = "Invalid Password."
                });
            }

            var token = _jwtService.GenerateToken(user); // สร้าง JWT

            return Ok(new AuthResponseDto
            {
                Token = token,
                isSuccess = true,
                Message = "Login Success."
            });
        }

        [Authorize]
        [HttpGet("detail")]
        public async Task<ActionResult<UserDetailDto>> GetUserDetail()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(currentUserId!);

            if (user is null)
            {
                return NotFound(new AuthResponseDto
                {
                    isSuccess = false,
                    Message = "User not found"
                });
            }

            return Ok(new UserDetailDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Telephone = user.Telephone,
                Roles = [.. await _userManager.GetRolesAsync(user)],
                Prifix = user.Prifix
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var usersDto = users.Select(u => new UserDetailDto
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.Firstname,
                LastName = u.Lastname,
                Telephone = u.Telephone,
                Roles = _userManager.GetRolesAsync(u).Result.ToArray(),
                Prifix = u.Prifix
            }).ToList();

            return Ok(usersDto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            // find User by their id

            var user = await _userManager.FindByIdAsync(id);

            if (user is null)
            {
                return NotFound("User not found.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { message = "User deleted successfully." });
            }

            return BadRequest("User deleting failed.");
        }

    }
}
