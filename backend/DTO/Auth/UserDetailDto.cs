using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class UserDetailDto
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Telephone { get; set; }
        public string[]? Roles { get; set; }
        public string? Prefix { get; set; }
    }
}