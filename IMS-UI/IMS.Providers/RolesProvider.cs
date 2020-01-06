using IMS_UI.IMS.Core.Infra;
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
    public class RolesProvider : IRolesProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public RolesProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<RolesResponse> GetAllRoles()
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.GetAsync("api/roles");
                return await ResultParser(response);
            }
        }

        private void prepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }

        private async Task<RolesResponse> ResultParser(HttpResponseMessage response)
        {
            RolesResponse apiResponse = new RolesResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<RolesResponse>(result);
            return apiResponse;
        }
    }
}
