using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Services.Interface;
using backend.Utilities;
using backend.Utilities.Interface;

namespace backend.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly AppSettings appSettings;
        public ITrace Trace { get; }

        private readonly IScheduleRepository scheduleRepository;
        public ScheduleService(AppSettings appSettings, ITrace trace, IScheduleRepository scheduleRepository)
        {
            this.scheduleRepository = scheduleRepository;
            this.Trace = trace;
            this.appSettings = appSettings;
        }

        public Result<PaginationList<ScheduleDto>> GetSchedules(int page, int size, ScheduleDto? search)
        {
            Result<PaginationList<ScheduleDto>> result = new Result<PaginationList<ScheduleDto>>(Trace);

            PaginationList<ScheduleDto> schedules = scheduleRepository.GetSchedules(page, size, search);
            if (schedules == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidData;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = schedules;
            }

            return result;
        }
        public Result<ScheduleDto> GetScheduleByDate(DateOnly date)
        {
            Result<ScheduleDto> result = new Result<ScheduleDto>(Trace);

            ScheduleDto scheduleDto = scheduleRepository.GetScheduletByDate(date);
            if (scheduleDto == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidData;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = scheduleDto;
            }

            return result;
        }
        public Result<ScheduleDto> CreateSchedule(ScheduleDto scheduleDto, string userId)
        {
            Result<ScheduleDto> result = new Result<ScheduleDto>(Trace);

            ScheduleDto createSchedule = scheduleRepository.CreateSchedule(scheduleDto, userId);
            if (createSchedule == null)
            {
                result.Success = false;
                result.Message = "Failed to create Schedule";
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.CreateSuccess!;
                result.Data = createSchedule;
            }

            return result;
        }
        public Result<ScheduleDto> UpdateSchedule(ScheduleDto ScheduleDto, string userId)
        {
            Result<ScheduleDto> result = new Result<ScheduleDto>(Trace);
            if (ScheduleDto.Id == null)
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else if (!scheduleRepository.IsHaveSchedule(ScheduleDto.Id))
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.ModifySuccess!;
                result.Data = scheduleRepository.UpdateSchedule(ScheduleDto, userId);
            }

            return result;
        }
        public Result<string> DeleteSchedule(int id)
        {
            throw new NotImplementedException();
        }


    }
}