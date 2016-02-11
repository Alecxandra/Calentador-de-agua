using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CalentadorDeAgua.Models;
namespace CalentadorDeAgua.Controllers
{
    public class SimulatorController : Controller
    {
        // GET: Simulator
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Insertar(string envTemp, string volumenTanque, string volumenAgua, string potenciaCalentador, string flujoEntranteAgua, string flujoSalienteAgua,    
                                   string actualTemp,string desiredTemp, string time)
        {
            Conexion con = new Conexion();
            string salida = con.insertar(envTemp, volumenTanque, volumenAgua, potenciaCalentador, flujoEntranteAgua, flujoSalienteAgua,actualTemp,desiredTemp, time);
            return salida;
        }
    }
}