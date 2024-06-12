using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ArticleTag
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public virtual Article Article {get; set;} = default!;
        public int TagId { get; set; }
        public virtual Tag Tag {get; set;} = default!;
        public DateTime CreatedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
    }
}