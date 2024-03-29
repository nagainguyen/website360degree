using Libs;
using Libs.Service;

//using Libs.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
}, ServiceLifetime.Transient);

builder.Services.AddTransient<ScenesService>();
builder.Services.AddTransient<LoginsService>();
builder.Services.AddTransient<AreasService>();
builder.Services.AddTransient<LocationsService>();
builder.Services.AddTransient<HotSpotsService>();



// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(

    name: "default",
    pattern: "{controller=Home}/{action=index}/{id?}");

app.Run();
