using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;


namespace CalentadorDeAgua.Models
{
    public class Conexion
    {
        SqlConnection cn;
        SqlCommand cmd;
        SqlDataReader dr;
        public int contador;
        public string res;

        public Conexion()
        {

            cn = new SqlConnection("Data Source=.;Initial Catalog=SimulacionCalentadorDeAgua;Integrated Security=True");
            cn.Open();

        }

        public string insertar(string envTemp, string volumenTanque, string volumenAgua, string potenciaCalentador,
                               string flujoEntranteAgua, string flujoSalienteAgua, string actualTemp, string desiredTemp, string time)
        {
            string salida = "Se guardo correctamente";


            string cmdString = "INSERT INTO Tanque (envTemp,volumenTanque, volumenAgua, potenciaCalentador,flujoEntranteAgua,flujoSalienteAgua,actualTemp,desiredTemp,time)" +
                               "VALUES (@envTemp, @volumenTanque,@volumenAgua,@potenciaCalentador,@flujoEntranteAgua,@flujoSalienteAgua,@actualTemp,@desiredTemp,@time)";
            using (SqlCommand comm = new SqlCommand(cmdString))
            {

                comm.Connection = cn;
                comm.Parameters.AddWithValue("@envTemp", envTemp);
                comm.Parameters.AddWithValue("@volumenTanque", volumenTanque);
                comm.Parameters.AddWithValue("@volumenAgua", volumenAgua);
                comm.Parameters.AddWithValue("@potenciaCalentador", potenciaCalentador);
                comm.Parameters.AddWithValue("@flujoEntranteAgua", flujoEntranteAgua);
                comm.Parameters.AddWithValue("@flujoSalienteAgua", flujoSalienteAgua);
                comm.Parameters.AddWithValue("@actualTemp", actualTemp);
                comm.Parameters.AddWithValue("@desiredTemp", desiredTemp);
                comm.Parameters.AddWithValue("@time", time);
                try
                {

                comm.ExecuteNonQuery();
                contador++;
                }catch
                {
                    salida = "ERROR";
                }
            }

            return salida;
        }
        public void cerrar()
        {
            cn.Close();
        }
    }
}