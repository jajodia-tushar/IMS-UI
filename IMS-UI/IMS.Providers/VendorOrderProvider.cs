using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
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

        public async Task<VendorOrdersList> getAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize)
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
                new KeyValuePair<string, string>("isApproved", approved),
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize),
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

        public async Task<VendorOrdersList> getParticularVendorOrder(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize)
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
                new KeyValuePair<string, string>("isApproved", approved),
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize),
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

        public async Task<Response> vendorOrderApproval(VendorOrder vendorOrder)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/VendorOrders/PendingApprovals";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _SessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(_IConfiguration["BaseURL"]);

            var myData = JsonConvert.SerializeObject(vendorOrder);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PutAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<Response> vendorOrderReject(int OrderID)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/vendororder/";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _SessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(_IConfiguration["BaseURL"]);

            var response = await client.DeleteAsync(client.BaseAddress + EndPoint + OrderID);
            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
