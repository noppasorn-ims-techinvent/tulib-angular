using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
        public string ModifiedById { get; set; } = string.Empty;
        public virtual User ModifiedBy { get; set; } = default!;
    }
}