using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class EmployeeProvider : IEmployeeProvider
    {
        private IConfiguration _iconfiguration;
        public EmployeeProvider(IConfiguration configuration)
        {
            _iconfiguration = configuration;
        }
        public async Task<EmployeeResponse> ValidateEmployee(string employeeId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/employee/";
            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);
            var response = await client.GetAsync(client.BaseAddress + EndPoint + employeeId);
            return JsonConvert.DeserializeObject<EmployeeResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}