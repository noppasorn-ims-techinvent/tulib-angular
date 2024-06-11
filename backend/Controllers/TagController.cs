using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;
using backend.Services.Interface;
using backend.Utilities;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings AppSettings;
        public ITrace Trace { get; }
        public ITagService tagService { get; }
        private IJwtService _jwtService;

        public TagController(UserManager<User> userManager, AppSettings AppSettings, ITrace Trace, ITagService tagService, IJwtService jwtService)
        {
            this.tagService = tagService;
            this.Trace = Trace;
            this.AppSettings = AppSettings;
            _userManager = userManager;
            _jwtService = jwtService;

        }

        [AllowAnonymous]
        [HttpGet("all")]
        public Result<PaginationList<TagDto>> GetTags(
                        [FromQuery] int page = 1,
                        [FromQuery] int size = 10,
                        [FromBody] TagDto? search = null
                    )
        {
            Result<PaginationList<TagDto>> result = new Result<PaginationList<TagDto>>(Trace);
            result = tagService.GetTags(page, size, search);
            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public Result<TagDto> GetTagById([FromQuery] int id)
        {
            Result<TagDto> result = new Result<TagDto>(Trace);
            result = tagService.GetTagById(id);
            return result;
        }
        [Authorize]
        [HttpPost]
        public Result<TagDto> CreateTag([FromBody] TagDto tagDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(currentUserId);
            if (currentUserId == null)
            {

                return new Result<TagDto>(Trace)
                {
                    Success = false,
                    Message = "User not authenticated",
                    Data = null
                };
            }

            Result<TagDto> result = tagService.CreateTag(tagDto, currentUserId);
            return result;
        }



        [Authorize]
        [HttpPut]
        public Result<TagDto> UpdateTag([FromBody] TagDto tagDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Result<TagDto> result = new Result<TagDto>(Trace);
            result = tagService.UpdateTag(tagDto, currentUserId!);
            return result;
        }


        [Authorize]
        [HttpDelete]
        public Result<string> DeleteTag([FromQuery] int id)
        {
            Result<string> result = new Result<string>(Trace);
            result = tagService.DeleteTag(id);
            return result;
        }
    }
}