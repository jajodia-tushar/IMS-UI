using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
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
    public class ItemListProvider:IItemListProvider
    {
        private IConfiguration _IConfiguration;
        private SessionManager _SessionManager;

        public ItemListProvider(IConfiguration config, SessionManager sessionManager)
        {
            _IConfiguration = config;
            _SessionManager = sessionManager;
        }
        public async Task<ItemResponse> ApiGetCaller(string path)
        {
            try
            {
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(_IConfiguration["BASEURL"]);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _SessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    var response = await http.GetAsync(path);
                    ItemResponse apiItemListResponse = new ItemResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiItemListResponse = JsonConvert.DeserializeObject<ItemResponse>(result);
                    return apiItemListResponse;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
