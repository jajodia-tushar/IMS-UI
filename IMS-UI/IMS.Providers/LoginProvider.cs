using IMS_UI.IMS.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class LoginProvider
    {
        private const string BASEURL = "http://localhost:53640";
       

        public async Task<JwtToken>  ApiCaller(Object requestData,string path)
        {
            try
            {
                var jsonString = JsonConvert.SerializeObject(requestData);
                HttpClient http = new HttpClient();
                http.BaseAddress = new Uri(BASEURL);
                http.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
                JwtToken token = new JwtToken();
                var data = new StringContent(jsonString, Encoding.UTF8, "application/json");
                JObject Json = JObject.Parse(jsonString);
                var response = await http.PostAsJsonAsync(path, Json);
                JwtToken jwtToken = new JwtToken();
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject jsondata = JObject.Parse(result);
                    jwtToken.token = jsondata["data"].ToString();
                }
                else
                    jwtToken.token = null;
                return jwtToken;
            }
            catch(Exception e)
            {
                throw e;
            }
            
        }
    }
}
