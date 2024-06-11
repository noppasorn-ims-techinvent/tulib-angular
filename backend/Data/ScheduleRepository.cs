using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ScheduleRepository : IScheduleRepository
    {

        private ApiContext Context { get; }

        public ScheduleRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public PaginationList<ScheduleDto> GetSchedules(int page, int size, ScheduleDto? search)
        {
            var data = new PaginationList<ScheduleDto>();

            IQueryable<ScheduleDate> query = Context.ScheduleDates.Include(sd => sd.ScheduleTimes);

            // Optionally, apply any filtering based on the search criteria (if provided)
            // if (search != null)
            // {
            //     // Add filtering logic based on your requirements
            // }

            List<ScheduleDto> scheduleList = query
                .Select((schedule) =>
                    new ScheduleDto
                    {
                        Id = schedule.Id,
                        StartDate = schedule.StartDate,
                        EndDate = schedule.EndDate,
                        Status = schedule.Status,
                        // Map ScheduleTimes from ScheduleDate to ScheduleDto
                        ScheduleTimes = schedule.ScheduleTimes.Select(st =>
                            new ScheduleTimeDto
                            {
                                Id = st.Id,
                                Date = st.Date,
                                StartTime = st.StartTime,
                                EndTime = st.EndTime,
                                Max = st.Max,
                                Count = st.Count
                            }
                        ).ToList()
                    }
                )
                .Skip((page - 1) * size)
                .Take(size)
                .AsNoTracking()
                .ToList();

            data.Total = query.Count();
            data.Content = scheduleList;
            data.Page = page;
            data.Size = size;

            return data;
        }


    public ScheduleDto GetScheduletByDate(DateOnly date)
{
    var schedule = Context.ScheduleDates
        .Include(sd => sd.ScheduleTimes)
        .Where(sd => sd.StartDate.Date <= date.ToDateTime(TimeOnly.MinValue) && sd.EndDate.Date >= date.ToDateTime(TimeOnly.MinValue))
        .Select(sd => new ScheduleDto
        {
            Id = sd.Id,
            StartDate = sd.StartDate,
            EndDate = sd.EndDate,
            Status = sd.Status,
            ScheduleTimes = sd.ScheduleTimes
                .Where(st => st.Date.Date == date.ToDateTime(TimeOnly.MinValue).Date) // Filter by the specified date
                .Select(st => new ScheduleTimeDto
                {
                    Id = st.Id,
                    Date = st.Date,
                    StartTime = st.StartTime,
                    EndTime = st.EndTime,
                    Max = st.Max,
                    Count = st.Count
                })
                .ToList()
        })
        .FirstOrDefault();

    return schedule;
}


        public ScheduleDto CreateSchedule(ScheduleDto scheduleDto, string userId)
        {
            DateTime currentTime = DateTime.Now;

            ScheduleDate scheduleDate = new ScheduleDate
            {
                StartDate = scheduleDto.StartDate,
                EndDate = scheduleDto.EndDate,
                Status = scheduleDto.Status,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userId,
                ModifiedById = userId
            };

            // Loop through each day between StartDate and EndDate
            for (DateTime date = scheduleDto.StartDate; date <= scheduleDto.EndDate; date = date.AddDays(1))
            {
                foreach (var scheduleTimeDto in scheduleDto.ScheduleTimes)
                {
                    ScheduleTime scheduleTime = new ScheduleTime
                    {
                        Date = date,
                        StartTime = scheduleTimeDto.StartTime,
                        EndTime = scheduleTimeDto.EndTime,
                        Max = scheduleTimeDto.Max,
                        Count = 0,
                        CreatedDate = currentTime,
                        ModifiedDate = currentTime,
                        CreatedById = userId,
                        ModifiedById = userId,
                        ScheduleDate = scheduleDate
                    };

                    scheduleDate.ScheduleTimes.Add(scheduleTime);
                }


            }

            Context.ScheduleDates.Add(scheduleDate);
            Context.SaveChanges();

            ScheduleDto createdScheduleDto = new ScheduleDto
            {
                Id = scheduleDate.Id,
                StartDate = scheduleDate.StartDate,
                EndDate = scheduleDate.EndDate,
                Status = scheduleDate.Status,
                ScheduleTimes = scheduleDate.ScheduleTimes.Select(st => new ScheduleTimeDto
                {
                    Id = st.Id,
                    Date = st.Date,
                    StartTime = st.StartTime,
                    EndTime = st.EndTime,
                    Max = st.Max,
                    Count = 0
                }).ToList()
            };

            return createdScheduleDto;
        }

        public ScheduleDto UpdateSchedule(ScheduleDto scheduleDto, string userId)
        {

            var existingSchedule = Context.ScheduleDates
                .Include(sd => sd.ScheduleTimes)
                .FirstOrDefault(sd => sd.Id == scheduleDto.Id);

            existingSchedule.StartDate = scheduleDto.StartDate;
            existingSchedule.EndDate = scheduleDto.EndDate;
            existingSchedule.Status = scheduleDto.Status;
            existingSchedule.ModifiedDate = DateTime.Now;
            existingSchedule.ModifiedById = userId;

            foreach (var scheduleTimeDto in scheduleDto.ScheduleTimes)
            {
                var existingScheduleTime = existingSchedule.ScheduleTimes.FirstOrDefault(st => st.Id == scheduleTimeDto.Id);
                if (existingScheduleTime != null)
                {
                    // existingScheduleTime.Date = scheduleTimeDto.Date;
                    existingScheduleTime.StartTime = scheduleTimeDto.StartTime;
                    existingScheduleTime.EndTime = scheduleTimeDto.EndTime;
                    existingScheduleTime.Max = scheduleTimeDto.Max;
                    existingScheduleTime.Count = scheduleTimeDto.Count;
                    existingScheduleTime.ModifiedDate = DateTime.Now;
                    existingScheduleTime.ModifiedById = userId;
                }
            }


            Context.SaveChanges();

            return scheduleDto;
        }

        public void DeleteSchedule(int id)
        {
            throw new NotImplementedException();
        }

        public bool IsHaveSchedule(int id)
        {
            return Context.ScheduleDates.Where(tag => tag.Id == id).Count() > 0;
        }


    }
}