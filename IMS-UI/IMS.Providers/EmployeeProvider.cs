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

        public async Task<EmployeesResponse> GetAllEmployee()
        {
            try
            {
                var endPoint = Constants.APIEndpoints.EmployeeProvider;
                using (HttpClient _client = new HttpClient())
                {
                    _client.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
                    _client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", sessionManager.GetString("token"));
                    var response = await _client.GetAsync(endPoint);
                    return JsonConvert.DeserializeObject<EmployeesResponse>(
                        await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception e)
            {
                throw e;
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