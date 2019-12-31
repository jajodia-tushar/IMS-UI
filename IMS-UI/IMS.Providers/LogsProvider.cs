using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Logging;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class LogsProvider :ILogsProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public LogsProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<LogsResponse> GetAllLogs()
        {
            using (HttpClient http = new HttpClient())
            {
                http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
                var response = await http.GetAsync("api/logs");
                return await LogsResultParser(response);
            }
        }

        private async Task<LogsResponse> LogsResultParser(HttpResponseMessage response)
        {
            LogsResponse apiResponse = new LogsResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<LogsResponse>(result);
            return apiResponse;
        }
    }
}
