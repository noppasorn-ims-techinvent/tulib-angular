using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class PaginationList<T>
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public int Size { get; set; }
        public List<T> Content { get; set; } = default!;
    }
}