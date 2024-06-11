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
    public class ScheduleController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings AppSettings;
        public ITrace Trace { get; }
        public IScheduleService scheduleService { get; }
        private IJwtService _jwtService;

        public ScheduleController(UserManager<User> userManager, AppSettings AppSettings, ITrace Trace, IScheduleService scheduleService, IJwtService jwtService)
        {
            this.scheduleService = scheduleService;
            this.Trace = Trace;
            this.AppSettings = AppSettings;
            _userManager = userManager;
            _jwtService = jwtService;

        }

        [AllowAnonymous]
        [HttpGet("all")]
        public Result<PaginationList<ScheduleDto>> GetSchedules(
                        [FromQuery] int page = 1,
                        [FromQuery] int size = 10,
                        [FromBody] ScheduleDto? search = null
                    )
        {
            Result<PaginationList<ScheduleDto>> result = new Result<PaginationList<ScheduleDto>>(Trace);
            result = scheduleService.GetSchedules(page, size, search);
            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public Result<ScheduleDto> GetScheduleById([FromQuery] DateOnly date)
        {
            Result<ScheduleDto> result = new Result<ScheduleDto>(Trace);
            result = scheduleService.GetScheduleByDate(date);
            return result;
        }
        [Authorize]
        [HttpPost]
        public Result<ScheduleDto> CreateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(currentUserId);
            if (currentUserId == null)
            {

                return new Result<ScheduleDto>(Trace)
                {
                    Success = false,
                    Message = "User not authenticated",
                    Data = null
                };
            }

            Result<ScheduleDto> result = scheduleService.CreateSchedule(scheduleDto, currentUserId);
            return result;
        }



        [Authorize]
        [HttpPut]
        public Result<ScheduleDto> UpdateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Result<ScheduleDto> result = new Result<ScheduleDto>(Trace);
            result = scheduleService.UpdateSchedule(scheduleDto, currentUserId!);
            return result;
        }


        // [Authorize]
        // [HttpDelete]
        // public Result<string> DeleteSchedule([FromQuery] int id)
        // {
        //     Result<string> result = new Result<string>(Trace);
        //     result = scheduleService.DeleteSchedule(id);
        //     return result;
        // }
    }
}