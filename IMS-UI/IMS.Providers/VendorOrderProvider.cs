using IMS_UI.IMS.Core;
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
    public class VendorOrderProvider : IVendorOrderProvider
    {
        private IConfiguration _IConfiguration;
        private SessionManager _SessionManager;

        public VendorOrderProvider(IConfiguration config,SessionManager manager)
        {
            _SessionManager = manager;
            _IConfiguration = config;
        }

        public async Task<VendorOrdersList> getAllVendorOrders(string toDate, string fromDate)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.VendorOrdersProvider;

            UriBuilder uriBuilder =
                new UriBuilder(_IConfiguration["BASEURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _SessionManager.GetString("token"));

            // client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("isApproved", "true"),
                new KeyValuePair<string, string>("pageNumber", "1"),
                new KeyValuePair<string, string>("pageSize", "10"),
                new KeyValuePair<string, string>("toDate", toDate),
                new KeyValuePair<string, string>("fromDate", fromDate),
                
            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<VendorOrdersList>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorOrdersList> getParticularVendorOrder(string vendorId, string toDate, string fromDate)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.VendorOrdersProvider;

            UriBuilder uriBuilder =
                new UriBuilder(_IConfiguration["BASEURL"] + EndPoint + vendorId);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _SessionManager.GetString("token"));

            // client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("isApproved", "true"),
                new KeyValuePair<string, string>("pageNumber", "1"),
                new KeyValuePair<string, string>("pageSize", "10"),
                new KeyValuePair<string, string>("toDate", toDate),
                new KeyValuePair<string, string>("fromDate", fromDate),

            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<VendorOrdersList>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorOrderResponse> postVendorOrder(VendorOrder vendorOrder)
        {
            try
            {
                string jsonString= JsonConvert.SerializeObject(vendorOrder);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(_IConfiguration["BASEURL"]);
                    var endPoint = "api/order/VendorOrders";
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _SessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    JObject Json = JObject.Parse(jsonString);
                    var response = await http.PostAsJsonAsync(endPoint, Json);
                    VendorOrderResponse apiVendorOrderResponse = new VendorOrderResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiVendorOrderResponse = JsonConvert.DeserializeObject<VendorOrderResponse>(result);
                    return apiVendorOrderResponse;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
