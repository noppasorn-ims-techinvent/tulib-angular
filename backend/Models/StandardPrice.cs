using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StandardPrice
    {
        public int Id { get; set; } 
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public float Price { get; set; }
        public DateTime StartDate { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
        public string ModifiedById { get; set; } = string.Empty;
        public virtual User ModifiedBy { get; set; } = default!;
    }
}