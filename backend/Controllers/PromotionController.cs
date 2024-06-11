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
    public class PromotionController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings AppSettings;
        public ITrace Trace { get; }
        public IPromotionService promotionService { get; }
        private IJwtService _jwtService;

        public PromotionController(UserManager<User> userManager, AppSettings AppSettings, ITrace Trace, IPromotionService promotionService, IJwtService jwtService)
        {
            this.promotionService = promotionService;
            this.Trace = Trace;
            this.AppSettings = AppSettings;
            _userManager = userManager;
            _jwtService = jwtService;

        }

        [AllowAnonymous]
        [HttpGet("all")]
        public Result<List<PromotionDto>> GetPromotions(
                        [FromQuery] DateOnly? date
                    )
        {
            Result<List<PromotionDto>> result = new Result<List<PromotionDto>>(Trace);
            result = promotionService.GetPromotions(date);
            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public Result<PromotionDto> GetPromotionById([FromQuery] int id)
        {
            Result<PromotionDto> result = new Result<PromotionDto>(Trace);
            result = promotionService.GetPromotionById(id);
            return result;
        }
        [Authorize]

        [HttpPost]
        public Result<PromotionDto> CreatePromotion([FromBody] PromotionDto promotionDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(currentUserId);
            if (currentUserId == null)
            {

                return new Result<PromotionDto>(Trace)
                {
                    Success = false,
                    Message = "User not authenticated",
                    Data = null
                };
            }

            Result<PromotionDto> result = promotionService.CreatePromotion(promotionDto, currentUserId);
            return result;
        }



        [Authorize]
        [HttpPut]
        public Result<PromotionDto> UpdatePromotion([FromBody] PromotionDto promotionDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Result<PromotionDto> result = new Result<PromotionDto>(Trace);
            result = promotionService.UpdatePromotion(promotionDto, currentUserId!);
            return result;
        }


        [Authorize]
        [HttpDelete]
        public Result<string> DeletePromotion([FromQuery] int id)
        {
            Result<string> result = new Result<string>(Trace);
            result = promotionService.DeletePromotion(id);
            return result;
        }
    }
}