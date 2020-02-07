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
    public class VendorProvider : IVendorProvider
    {
        private IConfiguration _iConfiguration;
        private SessionManager _sessionManager;

        public VendorProvider(IConfiguration iConfiguration,SessionManager sessionManager)
        {
            _sessionManager = sessionManager;
            _iConfiguration = iConfiguration;
        }

        public async Task<VendorResponse> GetAllVendors(string name,string pageNumber, string pagesize)
        {
            try
            {
                using (HttpClient http = new HttpClient())
                {
                    string path = Constants.APIEndpoints.getAllVendors;
                    UriBuilder uriBuilder = new UriBuilder(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]) + path);

                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);

                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                        new KeyValuePair<string, string>("name", name),
                        new KeyValuePair<string, string>("pageNumber", pageNumber),
                        new KeyValuePair<string, string>("pagesize", pagesize)
                    }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }
                    uriBuilder.Query = query;
                    var response = await http.GetAsync(uriBuilder.Uri);
                    VendorResponse apiVendorListResponse = new VendorResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiVendorListResponse = JsonConvert.DeserializeObject<VendorResponse>(result);
                    return apiVendorListResponse;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<VendorOrdersResponse> GetAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.VendorOrdersProvider;

            UriBuilder uriBuilder =
                new UriBuilder(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]) + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

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

            return JsonConvert.DeserializeObject<VendorOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorOrdersResponse> GetParticularVendorOrder(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.particularVendorOrder;

            UriBuilder uriBuilder =
                new UriBuilder(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]) + EndPoint + vendorId);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

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

            return JsonConvert.DeserializeObject<VendorOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorOrderResponse> PostVendorOrder(VendorOrder vendorOrder)
        {
            try
            {
                string jsonString= JsonConvert.SerializeObject(vendorOrder);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]));
                    var endPoint = "api/order/VendorOrders";
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
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

        public async Task<Response> VendorOrderApproval(VendorOrder vendorOrder)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/VendorOrders/PendingApprovals";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _sessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BaseURL"]));

            var myData = JsonConvert.SerializeObject(vendorOrder);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PutAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<Response> VendorOrderReject(int OrderID)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/vendororder/";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _sessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BaseURL"]));

            var response = await client.DeleteAsync(client.BaseAddress + EndPoint + OrderID);
            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorOrderResponse> GetVendorOrderByOrderId(int OrderId)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.VendorOrderProvider;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BaseURL"]));



            var response = await client.GetAsync(client.BaseAddress + EndPoint + OrderId);
            return JsonConvert.DeserializeObject<VendorOrderResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<VendorResponse> AddVendor(Vendor vendor)
        {
            try
            {
                string jsonString = JsonConvert.SerializeObject(vendor);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]));
                    var endPoint = Constants.APIEndpoints.vendorEndpoint;
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    JObject Json = JObject.Parse(jsonString);
                    var response = await http.PostAsJsonAsync(endPoint, Json);
                    VendorResponse apiAddVendorResponse = new VendorResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiAddVendorResponse = JsonConvert.DeserializeObject<VendorResponse>(result);
                    return apiAddVendorResponse;

                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<VendorResponse> EditVendor(Vendor vendor)
        {
            try
            {
                string jsonString = JsonConvert.SerializeObject(vendor);
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]));
                    var EndPoint = Constants.APIEndpoints.vendorEndpoint;
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    JObject Json = JObject.Parse(jsonString);
                    var response = await http.PutAsJsonAsync(EndPoint, Json);
                    VendorResponse apiEditVendorResponse = new VendorResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiEditVendorResponse = JsonConvert.DeserializeObject<VendorResponse>(result);
                    return apiEditVendorResponse;

                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<Response> DeactivateVendor(int vendorid, bool isHardDelete)
        {
            try
            {
               
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]));
                    var endPoint = Constants.APIEndpoints.vendorEndpoint;
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    var response = await http.DeleteAsync("api/vendor/" + vendorid.ToString() + "?isHardDelete=" + "False");
                    Response apiDeactivateVendorResponse = new Response();
                    var result = await response.Content.ReadAsStringAsync();
                    apiDeactivateVendorResponse = JsonConvert.DeserializeObject<Response>(result);
                    return apiDeactivateVendorResponse;

                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<Response> IsVendorDetailUnique(string vendorName,string phoneNumber,string pan,string gst,string cin)
        {
            try
            {
                using (HttpClient http = new HttpClient())
                {
                    string path = Constants.APIEndpoints.vendorIsUniqueEndpoint;
                    UriBuilder uriBuilder = new UriBuilder(Environment.GetEnvironmentVariable(_iConfiguration["BASEURL"]) + path);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _sessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                        new KeyValuePair<string, string>("name", vendorName),
                        new KeyValuePair<string, string>("mobile", phoneNumber),
                        new KeyValuePair<string, string>("pan", pan),
                        new KeyValuePair<string, string>("gst", gst),
                        new KeyValuePair<string, string>("cin", cin)

                    }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }
                    uriBuilder.Query = query;
                    var response = await http.GetAsync(uriBuilder.Uri);
                    Response apiUniqueVendorNameResponse = new Response();
                    var result = await response.Content.ReadAsStringAsync();
                    apiUniqueVendorNameResponse = JsonConvert.DeserializeObject<Response>(result);
                    return apiUniqueVendorNameResponse;

                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
