var builder = WebApplication.CreateBuilder(args);
var gameHost = new GameHost();

builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
        {
            policy.AllowAnyOrigin();
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});

var app = builder.Build();
app.UseCors("default");
app.MapGet("/", () => "Hello World!");
app.MapGet("/startGame", gameHost.StartGame);
app.MapGet("/tryYourLuck", gameHost.TryYourLuck);
app.MapGet("/revealSolution", gameHost.revealSolution);
app.MapGet("/listPlayers", gameHost.listPlayers);

app.Run();
