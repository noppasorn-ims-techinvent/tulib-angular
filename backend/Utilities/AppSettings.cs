using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Utilities
{
    public class AppSettings
    {
        public const string SectionName = "AppSettings";
        public const string JWTSetting = "JWTSettings";

        public Smtp Smtp { get; set; } = default!;
    }

    public class Smtp
    {
        public string Name { get; set; } = string.Empty;
        public string Server { get; set; } = string.Empty;
        public int Port { get; set; }
        public bool RequireAuthentication { get; set; }
        public bool EnableSsl { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}