using System.Net;
using System.Net.Mail;
using backend.Utilities.Interface;

namespace backend.Utilities
{
    public class Email : IEmail
    {
        private AppSettings AppSettings { get; }
        public Email(AppSettings appSettings)
        {
            this.AppSettings = appSettings;
        }

        public async Task SendEmailAsync(string subject, MailAddress from, MailAddress to, string htmlBody)
        {
            using SmtpClient smtpClient = new SmtpClient(AppSettings.Smtp.Server, AppSettings.Smtp.Port);
            using MailMessage message = new MailMessage(from, to);

            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = htmlBody;

            if (AppSettings.Smtp.EnableSsl)
            {
                smtpClient.EnableSsl = true;
            }

            if (AppSettings.Smtp.RequireAuthentication)
            {
                smtpClient.Credentials = new NetworkCredential(AppSettings.Smtp.Username, AppSettings.Smtp.Password);
            }

            await smtpClient.SendMailAsync(message);
        }
    }
}