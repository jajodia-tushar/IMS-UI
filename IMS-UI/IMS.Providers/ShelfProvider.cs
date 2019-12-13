using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using IMS_UI.IMS.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class ShelfProvider
    {
        private IConfiguration _iconfiguration;
        public ShelfProvider(IConfiguration configuration)
        {
            _iconfiguration = configuration;
        }
        public async Task<ShelfDataResponse> GetShelfData(string shelfId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/inventory/";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

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
                    http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
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
    }
}
