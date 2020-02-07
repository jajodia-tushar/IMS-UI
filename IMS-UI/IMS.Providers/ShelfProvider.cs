using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using IMS_UI.IMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers.Interfaces;
using IMS_UI.IMS.Core;
using Newtonsoft.Json.Linq;
using IMS_UI.IMS.Core.Infra;

namespace IMS_UI.IMS.Providers
{
    public class ShelfProvider : IShelfProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;
        public ShelfProvider(IConfiguration configuration,SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<ShelfDataResponse> GetShelfData(string shelfId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.ShelfProviderShelfData;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var response = await client.GetAsync(client.BaseAddress + EndPoint + shelfId);
            return JsonConvert.DeserializeObject<ShelfDataResponse>(
                await response.Content.ReadAsStringAsync());
        }
        public async Task<ShelfListResponse> ApiGetCaller(string path)
        {
            try
            {
                //var jsonString = JsonConvert.SerializeObject(requestData);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]));
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    //JObject Json = JObject.Parse(jsonString);
                    var response = await http.GetAsync(path);
                    ShelfListResponse apiShelfResponse = new ShelfListResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiShelfResponse = JsonConvert.DeserializeObject<ShelfListResponse>(result);
                    return apiShelfResponse;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        private void prepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]));
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }

        private JObject JsonMaker(Shelf shelf, HttpClient http)
        {
            string jsonString = JsonConvert.SerializeObject(shelf);
            http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]));
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        private async Task<ShelfListResponse> ShelvesResultParser(HttpResponseMessage response)
        {
            ShelfListResponse apiParsedResponse = new ShelfListResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiParsedResponse = JsonConvert.DeserializeObject<ShelfListResponse>(result);
            return apiParsedResponse;
        }

        public async Task<ShelfListResponse> EditShelf(Shelf shelf)
        {
            using (HttpClient http = new HttpClient())
            {
                JObject shelfJson = JsonMaker(shelf, http);
                var response = await http.PutAsJsonAsync("api/shelf", shelfJson);
                return await ShelvesResultParser(response);
            }
        }

        public async Task<ShelfListResponse> DeactivateShelf(string shelfCode)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.DeleteAsync("api/shelf/"+shelfCode);
                return await ShelvesResultParser(response);
            }
        }

        public async Task<ShelfListResponse> AddShelf(Shelf shelf)
        {
            using (HttpClient http = new HttpClient())
            {
                JObject shelfJson = JsonMaker(shelf, http);
                var response = await http.PostAsJsonAsync("api/shelf", shelfJson);
                return await ShelvesResultParser(response);
            }
        }
    }
}
