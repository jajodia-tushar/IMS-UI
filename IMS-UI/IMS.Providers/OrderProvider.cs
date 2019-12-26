using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using IMS_UI.IMS.Core;

namespace IMS_UI.IMS.Providers
{
    public class OrderProvider : IOrderProvider
    {
        private IConfiguration _iconfiguration;
        public OrderProvider(IConfiguration configuration)
        {
            _iconfiguration = configuration;
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
