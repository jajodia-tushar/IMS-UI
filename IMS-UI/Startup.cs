using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Session;
using System;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace IMS_UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(100);
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<SessionManager>();
            services.AddSingleton<ILoginProvider, LoginProvider>();
            services.AddSingleton<IEmployeeProvider, EmployeeProvider>();
            services.AddSingleton<IShelfProvider, ShelfProvider>();
            services.AddSingleton<ILogsProvider, LogsProvider>();
            services.AddSingleton<IUserProvider, UserProvider>();
            services.AddSingleton<IReportProvider, ReportsProvider>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSingleton<IStoreProvider, StoreProvider>();
            services.AddSingleton<StoreProvider>();
            services.AddSingleton<ReportsProvider>();
            services.AddSingleton<IFileStorage, FileSystemStorage>();
            services.AddSingleton<IVendorProvider, VendorProvider>();
            services.AddSingleton<IItemProvider,ItemProvider>();
            services.AddSingleton<INotificationProvider, NotificationProvider>();
            services.AddSingleton<IMS.Providers.Interfaces.IFileProvider, FileProvider>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddSingleton<EmployeeProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            app.UseSession();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 5, 0);
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
