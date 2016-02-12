using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CalentadorDeAgua.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
namespace CalentadorDeAgua.Controllers
{
    public class SimulatorController : Controller
    {

        private Conexion con = new Conexion();
        // GET: Simulator
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Insertar(string envTemp, string volumenTanque, string volumenAgua, string potenciaCalentador, string flujoEntranteAgua, string flujoSalienteAgua,    
                                   string actualTemp,string desiredTemp, string time)
        {
            string salida = con.insertar(envTemp, volumenTanque, volumenAgua, potenciaCalentador, flujoEntranteAgua, flujoSalienteAgua,actualTemp,desiredTemp, time);
            return salida;
        }

        [HttpGet]
        public JsonResult Get(){
            List<CalentadorDeAguaContext> datos= con.get();
            Object[] yourObjectArray = new Object[datos.Count()];
            for (int i = 0; i < datos.Count(); i++)
            {
                yourObjectArray[i] = new
                {
                    id = datos[i].id,
                    envTemp = datos[i].envTemp,
                    volumenTanque = datos[i].volumenTanque,
                    volumenAgua = datos[i].volumenAgua,
                    potenciaCalentador = datos[i].potenciaCalentador,
                    flujoEntranteAgua = datos[i].flujoEntranteAgua,
                    flujoSalienteAgua = datos[i].flujoSalienteAgua,
                    actualTemp = datos[i].actualTemp,
                    desiredTemp = datos[i].desiredTemp,
                    time = datos[i].time
                };
                   // new Object[]{ new { number = 555, api = 777, text = "text"},
                //new{ number = 578, api = 4055, text = "text"}};
            }
           
            return Json(yourObjectArray, JsonRequestBehavior.AllowGet);
        }

    }
}