using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Logging;
using IMS_UI.IMS.Providers.Interfaces;
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
                http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]));
                var response = await http.GetAsync("api/logs");
                return await LogsResultParser(response);
            }
        }

        public async Task<ActivityLogsResponse> GetAllActivityLogs(string fromDate, string toDate, string pageNumber, string pageSize)
        {
            var EndPoint = Constants.APIEndpoints.AuditLogs;
            UriBuilder uriBuilder =
                new UriBuilder(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]) + EndPoint);
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                string query;
                var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("fromDate", fromDate),
                new KeyValuePair<string, string>("toDate", toDate),
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize)
                });
                query = content.ReadAsStringAsync().Result;
                uriBuilder.Query = query;

                var response = await http.GetAsync(uriBuilder.Uri);
                return JsonConvert.DeserializeObject<ActivityLogsResponse>(await response.Content.ReadAsStringAsync());
            }
        }

        private async Task<LogsResponse> LogsResultParser(HttpResponseMessage response)
        {
            LogsResponse apiResponse = new LogsResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<LogsResponse>(result);
            return apiResponse;
        }

        private void prepareClient(HttpClient http)
        {
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }
    }
}
