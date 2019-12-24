
using IMS.Contracts;
using IMS_UI.IMS.Core.Infra;
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
    public class ShelfWiseOrderCountProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;
        public ShelfWiseOrderCountProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<ShelfWiseOrderCountResponse> GetShelfWiseCount(
            string fromDate,
            string toDate
        )
        {
            HttpClient client = new HttpClient();

            var EndPoint = "api/reports/getshelfwiseordercount";

            UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

            // client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("FromDate", fromDate),
                new KeyValuePair<string, string>("ToDate", toDate)
            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response = 
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<ShelfWiseOrderCountResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
