using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ScheduleDate
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
        public string ModifiedById { get; set; } = string.Empty;
        public virtual User ModifiedBy { get; set; } = default!;
        public virtual ICollection<ScheduleTime> ScheduleTimes { get; set; } = new List<ScheduleTime>();
    }
}