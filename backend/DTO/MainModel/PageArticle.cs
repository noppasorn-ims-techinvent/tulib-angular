using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.MainModel
{
    public class PageArticle
    {
        public int Id {get; set;}
        public string Title {get; set;} = string.Empty;
        public List<ArticleSubTag> TagId {get; set;} = default!;
        public DateTime ModifiedDate {get; set;}
        public bool Active {get; set;}
    }
}