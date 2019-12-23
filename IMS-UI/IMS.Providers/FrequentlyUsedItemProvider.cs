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
    public class FrequentlyUsedItemProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public FrequentlyUsedItemProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<FrequentlyUsedItem> GetList(
            string fromDate,
            string toDate,
            string itemCount
        )
        {
            HttpClient client = new HttpClient();
           
            var EndPoint = "api/reports/getmostconsumeditems";

            UriBuilder uriBuilder = 
                new UriBuilder(_iconfiguration["BaseURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

            //client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("startDate", fromDate),
                new KeyValuePair<string, string>("endDate", toDate),
                new KeyValuePair<string, string>("itemsCount", itemCount),
            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response = 
                await 
                    client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<FrequentlyUsedItem>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
