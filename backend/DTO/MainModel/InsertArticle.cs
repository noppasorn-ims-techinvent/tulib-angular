using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.MainModel
{
    public class InsertArticle
    {
        public string Title {get; set;} = string.Empty;
        public string Description {get; set;} = string.Empty;
        public string Url {get; set;} = string.Empty;
        public string ThumbnailImage {get; set;} = string.Empty;
        public string? Author {get; set;}
        public List<int> TagId {get; set;} = default!;
        public ArticleContentDto ArticleContent {get; set;} = new ArticleContentDto();
    }
}