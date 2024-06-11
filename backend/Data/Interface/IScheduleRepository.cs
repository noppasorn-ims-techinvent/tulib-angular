using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Data.Interface
{
    public interface IScheduleRepository
    {
        public PaginationList<ScheduleDto> GetSchedules(int page, int size, ScheduleDto? search);
        public ScheduleDto GetScheduletByDate(DateOnly date);
        public ScheduleDto CreateSchedule(ScheduleDto scheduleDto, string userId);
        public ScheduleDto UpdateSchedule(ScheduleDto scheduleDto, string userId);
        public void DeleteSchedule(int id);
        public bool IsHaveSchedule(int id);
    }
}