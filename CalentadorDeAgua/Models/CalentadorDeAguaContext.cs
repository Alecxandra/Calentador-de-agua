using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CalentadorDeAgua.Models
{
    public class CalentadorDeAguaContext
    {
        public string id { set; get; }
        public string envTemp {set;get;}
        public string volumenTanque { set; get; }
        public string volumenAgua { set; get; }
        public string potenciaCalentador { set; get; }
        public string flujoEntranteAgua { set; get; }
        public string flujoSalienteAgua { set; get; }
        public string actualTemp { set; get; }
        public string desiredTemp { set; get; }
        public string time { set; get; }

        public CalentadorDeAguaContext(string id,string envTemp, string volumenTanque, string volumenAgua, string potenciaCalentador, string flujoEntranteAgua,
                 string flujoSalienteAgua, string actualTemp,string desiredTemp,string time)
        {
            this.id = id;
            this.envTemp = envTemp;
            this.volumenTanque = volumenTanque;
            this.volumenAgua = volumenAgua;
            this.potenciaCalentador = potenciaCalentador;
            this.flujoEntranteAgua = flujoEntranteAgua;
            this.flujoSalienteAgua = flujoSalienteAgua;
            this.actualTemp = actualTemp;
            this.desiredTemp = desiredTemp;
            this.time = time;
        }

        
    }
}