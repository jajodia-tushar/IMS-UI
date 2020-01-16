using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
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
    public class StoreProvider : IStoreProvider
    {
        public IConfiguration _iconfiguration;
        public SessionManager _sessionManager;

        public StoreProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<StockStatusResponse> GetStockStatus(string pageNumber, string pageSize, string itemName)
        {
            try
            {
                using (HttpClient _client = new HttpClient())
                {
                    var EndPoint = Constants.APIEndpoints.StockProvider;
                    UriBuilder uriBuilder =
                        new UriBuilder(_iconfiguration["BASEURL"] + EndPoint);                    _client.DefaultRequestHeaders.Accept.Add(
                       new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
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

        public Task<Response> TransferToShelf(TransferToShelvesRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
