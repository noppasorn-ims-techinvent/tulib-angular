using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTO.MainModel
{
    public class ArticleContentDto
    {
        public string ContentImage { get; set; } = string.Empty;
        public string Header { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}