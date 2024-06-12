using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.MainModel
{
    public class TagObjectColor
    {
        public string Key {get; set;} = string.Empty;
        public ArticleSubTag Value {get; set;} = default!;
    }
}