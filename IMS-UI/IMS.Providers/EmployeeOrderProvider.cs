using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using System.Collections.Generic;

namespace IMS_UI.IMS.Providers
{
    public class EmployeeOrderProvider : IEmployeeOrderProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public EmployeeOrderProvider(IConfiguration configuration,SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<EmployeeRecentOrderResponse> getEmployeeOrders(string toDate, string fromDate, string pageNumber, string pageSize)
        {
            try
            {
                var endPoint = Constants.APIEndpoints.RecentEntriesProvider;
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + endPoint);
                using (HttpClient _client = new HttpClient())
                {
                    _client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize),
                new KeyValuePair<string, string>("toDate", toDate),
                new KeyValuePair<string, string>("fromDate", fromDate),

            }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }

                    uriBuilder.Query = query;

                    var response = await _client.GetAsync(uriBuilder.Uri);
                    return JsonConvert.DeserializeObject<EmployeeRecentOrderResponse>(
                        await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<EmployeeOrderResponse> PostOrders(EmployeeOrder placeEmployeeOrderRequest)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.OrderProvider;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            var myData = JsonConvert.SerializeObject(placeEmployeeOrderRequest);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<EmployeeOrderResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
