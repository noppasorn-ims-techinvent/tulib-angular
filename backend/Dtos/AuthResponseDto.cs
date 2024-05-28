using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public bool isSuccess { get; set; }
        public string? Message { get; set; }
    }
}