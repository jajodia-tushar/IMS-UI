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
    public class StockProvider
    {
        IConfiguration configuration;
        SessionManager sessionManager;

        public StockProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            this.configuration = configuration;
            this.sessionManager = sessionManager;
        }
        public async Task<StockStatusResponse> GetStockStatus(string pageNumber, string pageSize, string itemName)
        {
            try
            {
                using (HttpClient _client = new HttpClient())
                {
                    var EndPoint = Constants.APIEndpoints.StockProvider;
                    UriBuilder uriBuilder =
                        new UriBuilder(configuration["BASEURL"] + EndPoint);

                    //_client.BaseAddress = new Uri(configuration["BASEURL"]);
                    _client.DefaultRequestHeaders.Accept.Add(
                       new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", sessionManager.GetString("token"));
                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                    {
                        new KeyValuePair<string, string>("pageNumber", pageNumber),
                        new KeyValuePair<string, string>("pageSize", pageSize),
                        new KeyValuePair<string, string>("itemName", null)
                    }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }

                    uriBuilder.Query = query;
                    var response = await _client.GetAsync(uriBuilder.Uri);
                    return JsonConvert.DeserializeObject<StockStatusResponse>(
                       await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
