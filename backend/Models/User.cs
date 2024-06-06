using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public string Prefix {get;set;} = string.Empty;
        public string Firstname {get;set;} = string.Empty;
        public string Lastname {get;set;} = string.Empty;
        public string Telephone {get;set;} = string.Empty;
        
    }
}