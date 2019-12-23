using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Admin;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class RAGStatusProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public RAGStatusProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<RAGStatusResponse> GetList()
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/reports/getragstatus";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            var response = await client.GetAsync(client.BaseAddress + EndPoint);

            return JsonConvert.DeserializeObject<RAGStatusResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
