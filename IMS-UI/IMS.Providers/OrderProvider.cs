using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;

namespace IMS_UI.IMS.Providers
{
    public class OrderProvider
    {
        private IConfiguration _iconfiguration;
        public OrderProvider(IConfiguration configuration)
        {
            _iconfiguration = configuration;
        }
        public async Task<EmployeeOrdersResponse> PostOrders(Object obj)
        {
            HttpClient client = new HttpClient();
            var EndPoint = "/api/orders/EmployeeOrders";

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(_iconfiguration["BaseURL1"]);

            var myData = JsonConvert.SerializeObject(obj);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<EmployeeOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
