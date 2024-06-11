using System.Globalization;
using System.Text; // ใช้สำหรับการเข้ารหัสข้อความ
using backend.Data; // ใช้สำหรับการเชื่อมต่อข้อมูลในโปรเจค
using backend.Data.Interface;
using backend.Models; // ใช้สำหรับโมเดลในโปรเจค
using backend.Services;
using backend.Services.Interface;
using backend.Utilities;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer; // ใช้สำหรับการรับรองตัวตนแบบ JWT
using Microsoft.AspNetCore.Identity; // ใช้สำหรับระบบการจัดการผู้ใช้ของ ASP.NET Core
using Microsoft.EntityFrameworkCore; // ใช้สำหรับ Entity Framework Core
using Microsoft.IdentityModel.Tokens; // ใช้สำหรับการตรวจสอบความถูกต้องของโทเค็น
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;

// Nuget Packages เพิ่มเติมที่ใช้ 
// - Microsoft.EntityFrameworkCore.Tools
// - Microsoft.EntityFrameworkCore.Sqlite
// - Microsoft.AspNetCore.Identity.EntityFrameworkCore
// - Microsoft.AspNetCore.Authentication.JwtBearer 

//https://www.sqlitetutorial.net/ ใช้ SQLite 

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{
    var builder = WebApplication.CreateBuilder(args);
    var services = builder.Services;

    var cultureInfo = new CultureInfo("en-US");
    CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
    CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

    #region Add services
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    #region appsettings.json
    var appSettings = new AppSettings();
    builder.Configuration.GetSection(AppSettings.SectionName).Bind(appSettings);
    services.AddTransient<AppSettings>(x => { return appSettings; });
    #endregion

    #region Database
    services.AddDbContext<ApiContext>(options =>
    {
        string connectionString = builder.Configuration.GetConnectionString("databaseConnection")!;
        options.UseSqlServer(connectionString);
    });
    builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApiContext>()
    .AddDefaultTokenProviders();
    #endregion

    #region Health check
    #endregion

    #region Dependency Injection
    services.AddHttpContextAccessor();
    services.AddTransient<ITrace, Trace>();
    services.AddTransient<IEmail, Email>();

    #region Services
    services.AddTransient<IJwtService, JwtService>();
    services.AddTransient<ITagService, TagService>();
    services.AddTransient<IScheduleService, ScheduleService>();
    services.AddTransient<IPromotionService, PromotionService>();
    services.AddTransient<IStandardPriceService, StandardPriceService>();
    #endregion

    #region Repositories
    // services.AddTransient<IUserRepository, UserRepository>();
    services.AddTransient<ITagRepository, TagRepository>();
    services.AddTransient<IScheduleRepository, ScheduleRepository>();
    services.AddTransient<IPromotionRepository, PromotionRepository>();
    services.AddTransient<IStandardPriceRepository, StandardPriceRepository>();
    #endregion;

    #endregion

    #region JWT
    var JWTSetting = builder.Configuration.GetSection(AppSettings.JWTSetting);
    string? securityKey = JWTSetting.GetValue<string>("securityKey");
    if (string.IsNullOrEmpty(securityKey))
    {
        throw new ArgumentNullException(nameof(securityKey), "JWT security key is not configured.");
    }

    builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(opt =>
    {
        opt.SaveToken = true;
        opt.RequireHttpsMetadata = false;
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = JWTSetting["ValidAudience"],
            ValidIssuer = JWTSetting["ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey))
        };
    });
    #endregion

    #region Swagger
    builder.Services.AddSwaggerGen(c =>
    {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = @"JWT Authorization Example : 'Bearer {token}'",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "outh2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
        });
    });
    #endregion

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var app = builder.Build();

    if (app.Environment.IsDevelopment() || app.Environment.IsStaging()) // เปิดใช้งาน Swagger UI ในสภาพแวดล้อม Development หรือ Staging
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
    #endregion
}
catch (Exception exception)
{
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    LogManager.Shutdown();
}