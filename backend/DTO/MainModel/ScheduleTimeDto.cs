using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.MainModel
{
    public class ScheduleTimeDto
    {
        public int Id { get; set; } // Primary key
        public DateTime? Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Max { get; set; }
        public int Count { get; set; } // must be <= Max
    }
}