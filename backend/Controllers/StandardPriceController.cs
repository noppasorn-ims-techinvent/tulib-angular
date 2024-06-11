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
    public class StandardPriceController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings AppSettings;
        public ITrace Trace { get; }
        public IStandardPriceService standardPriceService { get; }
        private IJwtService _jwtService;

        public StandardPriceController(UserManager<User> userManager, AppSettings AppSettings, ITrace Trace, IStandardPriceService standardPriceService, IJwtService jwtService)
        {
            this.standardPriceService = standardPriceService;
            this.Trace = Trace;
            this.AppSettings = AppSettings;
            _userManager = userManager;
            _jwtService = jwtService;

        }

        [AllowAnonymous]
        [HttpGet("all")]
        public Result<List<StandardPriceDto>> GetStandardPrices(
                        [FromQuery] DateOnly? date
                    )
        {
            Result<List<StandardPriceDto>> result = new Result<List<StandardPriceDto>>(Trace);
            result = standardPriceService.GetStandardPrices(date);
            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public Result<StandardPriceDto> GetStandardPriceById([FromQuery] int id)
        {
            Result<StandardPriceDto> result = new Result<StandardPriceDto>(Trace);
            result = standardPriceService.GetStandardPriceById(id);
            return result;
        }
        [Authorize]

        [HttpPost]
        public Result<StandardPriceDto> CreateStandardPrice([FromBody] StandardPriceDto standardPriceDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(currentUserId);
            if (currentUserId == null)
            {

                return new Result<StandardPriceDto>(Trace)
                {
                    Success = false,
                    Message = "User not authenticated",
                    Data = null
                };
            }

            Result<StandardPriceDto> result = standardPriceService.CreateStandardPrice(standardPriceDto, currentUserId);
            return result;
        }



        [Authorize]
        [HttpPut]
        public Result<StandardPriceDto> UpdateStandardPrice([FromBody] StandardPriceDto standardPriceDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Result<StandardPriceDto> result = new Result<StandardPriceDto>(Trace);
            result = standardPriceService.UpdateStandardPrice(standardPriceDto, currentUserId!);
            return result;
        }


        [Authorize]
        [HttpDelete]
        public Result<string> DeleteStandardPrice([FromQuery] int id)
        {
            Result<string> result = new Result<string>(Trace);
            result = standardPriceService.DeleteStandardPrice(id);
            return result;
        }
    }
}