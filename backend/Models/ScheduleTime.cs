using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ScheduleTime
    {
        public int Id { get; set; } // Primary key
        public int ScheduleDateId { get; set; }
        public virtual ScheduleDate ScheduleDate { get; set; } = default!;
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Max { get; set; }
        public int Count { get; set; } // must be <= Max
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
        public string ModifiedById { get; set; } = string.Empty;
        public virtual User ModifiedBy { get; set; } = default!;
    }
}