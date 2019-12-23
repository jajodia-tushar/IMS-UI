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
    public class ItemWiseAnalysisProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public ItemWiseAnalysisProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<DateItemConsumptionResponse> GetItemWiseAnalysis(
            string fromDate,
            string toDate
        )
        {
            HttpClient client = new HttpClient();

            // CAN CHANGE LATER
            var EndPoint = "api/reports/getitemwiseanalysis";

            UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BaseURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(item: new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("fromDate", fromDate),
                new KeyValuePair<string, string>("toDate", toDate)
            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await
                    client.GetAsync(uriBuilder.Uri);



            return JsonConvert.DeserializeObject<DateItemConsumptionResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
