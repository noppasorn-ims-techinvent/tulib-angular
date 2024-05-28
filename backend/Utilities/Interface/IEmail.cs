using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace backend.Utilities.Interface
{
    public interface IEmail
    {
        public Task SendEmailAsync(string subject, MailAddress from, MailAddress to, string htmlBody);
    }
}