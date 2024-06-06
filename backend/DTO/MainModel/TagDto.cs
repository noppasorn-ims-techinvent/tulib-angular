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
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool Active { get; set; }
        public string ?  CreatedBy { get; set; } 
        public string ?  ModifiedBy { get; set; } 

    }
}