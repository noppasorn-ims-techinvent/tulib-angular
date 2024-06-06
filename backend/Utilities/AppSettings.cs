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
        public ErrorMessage ErrorMessage { get; set; } = default!;
        public SuccessMessage SuccessMessage { get; set; } = default!;
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
    public class ErrorMessage
    {
        public string General { get; set; } = String.Empty;
        public string EmptyUsername { get; set; } = String.Empty;
        public string EmptyPassword { get; set; } = String.Empty;
        public string EmptyRegisterData { get; set; } = String.Empty;
        public string DuplicateUser { get; set; } = String.Empty;
        public string DuplicateNoUser { get; set; } = String.Empty;
        public string InvalidRole { get; set; } = String.Empty;
        public string InvalidUsernameOrPassword { get; set; } = String.Empty;
        public string InActiveUser { get; set; } = String.Empty;
        public string OnlyOneAdminLeft { get; set; } = String.Empty;
        public string UsernameMinimumlengthDetect { get; set; } = String.Empty;
        public string UsernameMaximumlengthDetect { get; set; } = String.Empty;
        public string UsernameRestrictSpecialChar { get; set; } = String.Empty;
        public string PasswordMinimumlengthDetect { get; set; } = String.Empty;
        public string PasswordMaximumlengthDetect { get; set; } = String.Empty;
        public string PasswordRestrictSpecialChar { get; set; } = String.Empty;
        public string InvalidUserActionForCurrentUser { get; set; } = String.Empty;
        public string InvalidId { get; set; } = String.Empty;
        public string InvalidActive { get; set; } = String.Empty;
        public string ScheduleSlotFormError { get; set; } = String.Empty;
        public string BuyTicketError { get; set; } = String.Empty;
        public string StandradPriceIsEmpty { get; set; } = String.Empty;
        public string PreBookingError { get; set; } = String.Empty;
        public string InvalidData { get; set; } = String.Empty;

    }

    public class SuccessMessage
    {
        public string? CreateSuccess { get; set; }
        public string? GetSuccess { get; set; }
        public string? ModifySuccess { get; set; }
        public string? DeleteSuccess { get; set; }
        public string? LoginSuccess { get; set; }
        public string? DataSuccess { get; set; }
        public string? BuyTicketSuccess { get; set; }
    }
}