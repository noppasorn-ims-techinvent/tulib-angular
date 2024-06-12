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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings AppSettings;
        public ITrace Trace { get; }
        public IArticleService articleService { get; }
        private IJwtService _jwtService;

        public ArticleController(UserManager<User> userManager, AppSettings AppSettings, ITrace Trace, IJwtService jwtService,IArticleService articleService)
        {
            this.articleService = articleService;
            this.Trace = Trace;
            this.AppSettings = AppSettings;
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [Authorize]
        [HttpPost]
        public Result<InsertArticle> InsertArticle([FromBody] InsertArticle insertData)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
            {
                return new Result<InsertArticle>(Trace)
                {
                    Success = false,
                    Message = "User not authenticated",
                    Data = null
                };
            }

            Result<InsertArticle> result = new Result<InsertArticle>(Trace);
            result = articleService.InsertArticle(insertData, currentUserId!);
            return result;
        }

        [Authorize]
        [HttpGet("all")] 
        public Result<PaginationList<PageArticle>> GetArticle(
            [FromQuery] string? Title,
            [FromQuery] List<int> TagList,
            [FromQuery] string? StartDate,
            [FromQuery] string? EndDate,
            [FromQuery] bool? active,
            [FromQuery] int page,
            [FromQuery] int size
        )
        {
            Result<PaginationList<PageArticle>> result = articleService.GetArticle(Title, TagList, StartDate, EndDate, active, page, size);
            return result;
        }

        
        [HttpGet]
        public Result<PageArticleData> GetArticleDataById(
            [FromQuery] int articleId
        )
        {
            Result<PageArticleData> result = articleService.GetArticleDataById(articleId);
            return result;
        }
    }
}