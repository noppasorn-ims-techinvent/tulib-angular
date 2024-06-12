using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title {get; set;} = string.Empty;
        public string Description {get; set;} = string.Empty;
        public string Url {get; set;} = string.Empty;
        public string ThumbnailImage {get; set;} = string.Empty;
        public string? Author {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
        public string ModifiedById { get; set; } = string.Empty;
        public virtual User ModifiedBy { get; set; } = default!;
        public bool Active {get; set;}
    }
}