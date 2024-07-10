var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(
    options => options.AddPolicy("AllowKonsisTest", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddControllers();

builder.Services.AddSingleton(new LiteDatabase("database.db"));

builder.Services.AddTransient<IPasswordRepository, PasswordRepository>();
builder.Services.AddTransient<PasswordService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "KonsisTest.WebAPI", Version = "1.0" } );

    var xmlDocPaths = Directory.GetFiles(AppContext.BaseDirectory, "*.xml", SearchOption.TopDirectoryOnly).ToList();
    xmlDocPaths.ForEach(xmlDocPath => options.IncludeXmlComments(xmlDocPath));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();
app.UseCors("AllowKonsisTest");
app.MapControllers();
app.Run();