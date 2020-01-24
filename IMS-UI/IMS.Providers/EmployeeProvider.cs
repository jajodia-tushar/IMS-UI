using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace IMS_UI.IMS.Providers
{
    public class EmployeeProvider : IEmployeeProvider
    {
        private IConfiguration _iconfiguration;
        SessionManager sessionManager;
        public EmployeeProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            this.sessionManager = sessionManager;
        }



        public async Task<EmployeesResponse> AddEmployee(Employee employee)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                JObject employeeJson = JsonMaker(employee);
                var response = await http.PostAsJsonAsync("api/employee", employeeJson);
                return await EmployeeResultParser(response);
            }
        }

        public async Task<EmployeesResponse> EditEmployee(Employee employee)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                JObject employeeJson = JsonMaker(employee);
                var response = await http.PutAsJsonAsync("api/employee", employeeJson);
                return await EmployeeResultParser(response);
            }
        }



        private async Task<Response> ResultParser(HttpResponseMessage response)
        {
            Response apiResponse = new EmployeesResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<Response>(result);
            return apiResponse;
        }

        private async Task<EmployeesResponse> EmployeeResultParser(HttpResponseMessage response)
        {
            EmployeesResponse apiParsedResponse = new EmployeesResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiParsedResponse = JsonConvert.DeserializeObject<EmployeesResponse>(result);
            return apiParsedResponse;
        }

        public async Task<EmployeesResponse> GetAllEmployee(string pageNumber, string pageSize)
        {
            using (HttpClient http = new HttpClient())
            {
                try
                {
                    using (HttpClient _client = new HttpClient())
                    {
                        var EndPoint = Constants.APIEndpoints.EmployeeProvider;
                        UriBuilder uriBuilder =
                            new UriBuilder(_iconfiguration["BASEURL"] + EndPoint);
                        _client.DefaultRequestHeaders.Accept.Add(
                           new MediaTypeWithQualityHeaderValue("application/json"));
                        _client.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", sessionManager.GetString("token"));

                            string query = $"?pageNumber={int.Parse(pageNumber)}&pageSize={int.Parse(pageSize)}";
                            var response = await _client.GetAsync(uriBuilder.Uri+query);
                        return JsonConvert.DeserializeObject<EmployeesResponse>(
                           await response.Content.ReadAsStringAsync());
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        private JObject JsonMaker(Employee employee)
        {
            string jsonString = JsonConvert.SerializeObject(employee);
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        private void prepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", sessionManager.GetString("token"));
        }

        public async Task<Response> DeactivateEmployee(string id, bool isHardDelete)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.DeleteAsync("api/employee?id=" + id.ToString() + "&isHardDelete=" + isHardDelete.ToString());
                return await ResultParser(response);
            }
        }


        
 
        public async Task<EmployeeResponse> ValidateEmployee(string employeeId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.EmployeeProvider;
            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);
            var response = await client.GetAsync(client.BaseAddress + EndPoint + employeeId);
            return JsonConvert.DeserializeObject<EmployeeResponse>(
                await response.Content.ReadAsStringAsync());
        }


    }
}