using IMS_UI.IMS.Models;
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
    
    public class ShelfProvider
    {
        private IConfiguration _Configuration;
        public ShelfProvider(IConfiguration config)
        {
            _Configuration = config;
        }

        public async Task<ShelfResponse> ApiGetCaller( string path)
        {
            try
            {
                //var jsonString = JsonConvert.SerializeObject(requestData);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(_Configuration["BASEURL"]);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    //JObject Json = JObject.Parse(jsonString);
                    var response = await http.GetAsync(path);
                    ShelfResponse apiShelfResponse = new ShelfResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiShelfResponse = JsonConvert.DeserializeObject<ShelfResponse>(result);
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
