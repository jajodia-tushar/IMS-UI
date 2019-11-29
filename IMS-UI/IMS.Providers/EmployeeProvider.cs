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
    public class EmployeeProvider
    {
        HttpClient client;
        string API;
        private const string BASEURL = "http://localhost:52877/";

        public EmployeeProvider()
        {
            client = new HttpClient();
            API = "api/";
        }
        public async Task<EmployeeResponse> ValidateEmployee(int employeeId)
        {
            var EndPoint = "Employee/";
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response =await client.GetAsync(new Uri(BASEURL+API+EndPoint+employeeId));
            return JsonConvert.DeserializeObject<EmployeeResponse>(await response.Content.ReadAsStringAsync());

        }

    }

}



//

//    public async Task<Employee> ApiCaller(Object requestData, string path)
//    {
//        try
//        {
//            var jsonString = JsonConvert.SerializeObject(requestData);
//            HttpClient http = new HttpClient();
//            http.BaseAddress = new Uri(BASEURL);
//            http.DefaultRequestHeaders.Accept.Add(
//            new MediaTypeWithQualityHeaderValue("application/json"));
//            JObject Json = JObject.Parse(jsonString);
//            var response = await http.PostAsJsonAsync(path, Json);
//            Employee apiLoginResponse = new Employee();
//            var result = await response.Content.ReadAsStringAsync();
//            apiLoginResponse = JsonConvert.DeserializeObject<Employee>(result);
//            return apiLoginResponse;
//        }
//        catch (Exception e)
//        {
//            throw e;
//        }


