using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CalentadorDeAgua.Startup))]
namespace CalentadorDeAgua
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
