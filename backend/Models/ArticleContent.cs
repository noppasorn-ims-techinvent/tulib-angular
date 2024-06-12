using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ArticleContent
    {
        public int Id { get; set; }
        public string ContentImage { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Header { get; set; } = string.Empty;
        public int ArticleId { get; set; }
        public virtual Article Article { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public string CreatedById { get; set; } = string.Empty;
        public virtual User CreatedBy { get; set; } = default!;
    }
}