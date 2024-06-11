using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Services.Interface
{
    public interface IScheduleService
    {
        public Result<ScheduleDto> GetScheduleByDate(DateOnly date);
        public Result<PaginationList<ScheduleDto>> GetSchedules(int page, int size, ScheduleDto? search);
        public Result<ScheduleDto> CreateSchedule(ScheduleDto scheduleDto, string userId);
        public Result<ScheduleDto> UpdateSchedule(ScheduleDto scheduleDto, string userId);
        public Result<string> DeleteSchedule(int id);
    }
}