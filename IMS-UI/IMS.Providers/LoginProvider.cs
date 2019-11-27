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
        private const string BASEURL = "http://localhost:60110";
       

        public async Task<LoginResponse>  ApiCaller(Object requestData,string path)
        {
            try
            {
                var jsonString = JsonConvert.SerializeObject(requestData);
                HttpClient http = new HttpClient();
                http.BaseAddress = new Uri(BASEURL);
                http.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
                JObject Json = JObject.Parse(jsonString);
                var response = await http.PostAsJsonAsync(path, Json);
                LoginResponse apiLoginResponse = new LoginResponse();
                var result = await response.Content.ReadAsStringAsync();
                apiLoginResponse = JsonConvert.DeserializeObject<LoginResponse>(result);
                return apiLoginResponse;
            }
            catch(Exception e)
            {
                throw e;
            }
            
        }
    }
}
