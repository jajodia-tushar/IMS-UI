using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class ItemProvider : IItemProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public ItemProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<ItemsResponse> GetAllItems()
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.GetAsync("api/item");
                return await ItemsResultParser(response);
            }
        }
        public async Task<ItemResponse> AddItem(Item item)
        {
            using (HttpClient http = new HttpClient())
            {
                JObject itemJson = JsonMaker(item, http);
                var response = await http.PostAsJsonAsync("api/item", itemJson);
                return await ResultParser(response);
            }
        }
        public async Task<ItemResponse> EditItem(Item item)
        {
            using (HttpClient http = new HttpClient())
            {
                JObject itemJson = JsonMaker(item, http);
                var response = await http.PutAsJsonAsync("api/item", itemJson);
                return await ResultParser(response);
            }
        }
        public async Task<Response> DeactivateItem(int itemId, bool isHardDelete)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.DeleteAsync("api/item" +"?id="+ itemId + "&isHardDelete=" + isHardDelete);
                return await ResultParser(response);
            }
        }

        private void prepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }
        private async Task<ItemResponse> ResultParser(HttpResponseMessage response)
        {
            ItemResponse apiLoginResponse = new ItemResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiLoginResponse = JsonConvert.DeserializeObject<ItemResponse>(result);
            return apiLoginResponse;
        }
        private JObject JsonMaker(Item item, HttpClient http)
        {
            string jsonString = JsonConvert.SerializeObject(item);
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        private async Task<ItemsResponse> ItemsResultParser(HttpResponseMessage response)
        {
           ItemsResponse apiParsedResponse = new ItemsResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiParsedResponse = JsonConvert.DeserializeObject<ItemsResponse>(result);
            return apiParsedResponse;
        }
    }
}
