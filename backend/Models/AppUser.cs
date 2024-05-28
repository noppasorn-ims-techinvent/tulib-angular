using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; internal set; }
        public string? LastName { get; internal set; }
    }
}