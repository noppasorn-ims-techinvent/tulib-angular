using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Utilities.Interface
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}