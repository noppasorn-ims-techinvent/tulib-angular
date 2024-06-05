using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTO.MainModel
{
    public class TagDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; } 
        public string? Code { get; set; } 
        public bool? Active { get; set; }
        
        public int CreatedById{get;set;}
        public virtual User CreatedBy {get; set;} = default!;
        public int ModifiedById{get;set;}
        public virtual User ModifiedBy {get; set;} = default!;
    }
}