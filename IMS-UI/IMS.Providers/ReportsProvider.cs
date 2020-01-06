using IMS_UI.IMS.Core;
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
    public class ReportsProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;
        public ReportsProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<ItemsAvailabilityResponse> GetRAGSTatusReport(
            string locationName,string locationCode,string colour,string pageNumber, string pageSize)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.reportsGetRAGReports;

            UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

            // client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("locationName", locationName),
                new KeyValuePair<string, string>("locationCode", locationCode),
                new KeyValuePair<string, string>("colour", colour),
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize)
            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<ItemsAvailabilityResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
