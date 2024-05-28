using System.Text; // ใช้สำหรับการเข้ารหัสข้อความ
using backend.Data; // ใช้สำหรับการเชื่อมต่อข้อมูลในโปรเจค
using backend.Models; // ใช้สำหรับโมเดลในโปรเจค
using Microsoft.AspNetCore.Authentication.JwtBearer; // ใช้สำหรับการรับรองตัวตนแบบ JWT
using Microsoft.AspNetCore.Identity; // ใช้สำหรับระบบการจัดการผู้ใช้ของ ASP.NET Core
using Microsoft.EntityFrameworkCore; // ใช้สำหรับ Entity Framework Core
using Microsoft.IdentityModel.Tokens; // ใช้สำหรับการตรวจสอบความถูกต้องของโทเค็น
using Microsoft.OpenApi.Models; // ใช้สำหรับ Swagger

// Nuget Packages เพิ่มเติมที่ใช้ 
// - Microsoft.EntityFrameworkCore.Tools
// - Microsoft.EntityFrameworkCore.Sqlite
// - Microsoft.AspNetCore.Identity.EntityFrameworkCore
// - Microsoft.AspNetCore.Authentication.JwtBearer 

//https://www.sqlitetutorial.net/ ใช้ SQLite 

var builder = WebApplication.CreateBuilder(args); 

var JWTSetting = builder.Configuration.GetSection("JWTSettings"); // ดึงค่าการตั้งค่า JWT จากไฟล์ configuration

// ตรวจสอบให้แน่ใจว่าค่า securityKey ไม่ใช่ null
string? securityKey = JWTSetting.GetValue<string>("securityKey");
if (string.IsNullOrEmpty(securityKey))
{
    throw new ArgumentNullException(nameof(securityKey), "JWT security key is not configured.");
}

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=auth.db")); // กำหนดให้ใช้ฐานข้อมูล SQLite

builder.Services.AddIdentity<AppUser, IdentityRole>() // เพิ่มบริการจัดการผู้ใช้และบทบาท (Identity)
    .AddEntityFrameworkStores<AppDbContext>() // ใช้ AppDbContext สำหรับ Identity
    .AddEntityFrameworkStores<AppDbContext>(); // ยืนยันการเพิ่ม EntityFramework stores

builder.Services.AddAuthentication(opt => { // กำหนดการรับรองตัวตน
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // ตั้งค่า scheme การรับรองตัวตนเริ่มต้นเป็น JWT
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // ตั้งค่า scheme การท้าทายเริ่มต้นเป็น JWT
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; // ตั้งค่า scheme เริ่มต้นเป็น JWT
}).AddJwtBearer(opt => { // เพิ่มการรับรองตัวตนแบบ JWT Bearer
    opt.SaveToken = true; // บันทึกโทเค็นหลังจากการรับรองตัวตนสำเร็จ
    opt.RequireHttpsMetadata = false; // ไม่ต้องการ HTTPS (ใช้สำหรับการพัฒนา)
    opt.TokenValidationParameters = new TokenValidationParameters // กำหนดพารามิเตอร์การตรวจสอบความถูกต้องของโทเค็น
    {
        ValidateIssuer = true, // ตรวจสอบความถูกต้องของ issuer
        ValidateAudience = true, // ตรวจสอบความถูกต้องของ audience
        ValidateLifetime = true, // ตรวจสอบความถูกต้องของอายุโทเค็น
        ValidateIssuerSigningKey = true, // ตรวจสอบความถูกต้องของ signing key
        ValidAudience = JWTSetting["ValidAudience"], // กำหนด audience ที่ถูกต้องจากการตั้งค่า
        ValidIssuer = JWTSetting["ValidIssuer"], // กำหนด issuer ที่ถูกต้องจากการตั้งค่า
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey)) // กำหนด signing key
    };
});

builder.Services.AddControllers(); // เพิ่มบริการสำหรับคอนโทรลเลอร์

// เรียนรู้เพิ่มเติมเกี่ยวกับการตั้งค่า Swagger/OpenAPI ได้ที่ https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); // เพิ่มการสำรวจ endpoint ของ API
builder.Services.AddSwaggerGen(c => { // เพิ่มบริการการสร้าง Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme{ // กำหนด security scheme สำหรับ Swagger
        Description = @"JWT Authorization Example : 'Bearer eieiteestesttsettest'", // คำอธิบายของ security scheme
        Name = "Authorization", // ชื่อของพารามิเตอร์ใน header
        In = ParameterLocation.Header, // ตำแหน่งของพารามิเตอร์
        Type = SecuritySchemeType.ApiKey, // ประเภทของ security scheme
        Scheme = "Bearer" // ชื่อ scheme
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement() { // เพิ่มข้อกำหนดด้านความปลอดภัยสำหรับ Swagger
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme, // ประเภทของการอ้างอิง
                    Id = "Bearer" // ID ของการอ้างอิง
                },
                Scheme = "outh2", // ชื่อ scheme
                Name = "Bearer", // ชื่อของ scheme
                In = ParameterLocation.Header, // ตำแหน่งของพารามิเตอร์
            },
            new List<string>() // ขอบเขตที่ต้องการ (ในกรณีนี้ไม่มี)
        }
    });
});

var app = builder.Build();

// กำหนดการ pipeline ของ HTTP request
if (app.Environment.IsDevelopment()) // ตรวจสอบว่าสภาพแวดล้อมเป็นการพัฒนาหรือไม่
{
    app.UseSwagger(); // เปิดใช้งาน Swagger
    app.UseSwaggerUI(); // เปิดใช้งาน Swagger UI
}

app.UseHttpsRedirection(); // ใช้การเปลี่ยนเส้นทาง HTTPS
app.UseAuthentication(); // ใช้มิดเดิลแวร์การรับรองตัวตน

app.UseAuthorization(); // ใช้มิดเดิลแวร์การอนุญาต

app.MapControllers();

app.Run();
