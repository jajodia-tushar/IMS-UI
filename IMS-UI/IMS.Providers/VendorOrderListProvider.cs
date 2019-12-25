using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Models.Vendor;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class VendorOrderListProvider
    {
        private IConfiguration _iconfiguration;

        public VendorOrderListProvider(IConfiguration configuration)
        {
            _iconfiguration = configuration;
        }
        public async Task<ListofVendorOrderDetails> getorderdetails()
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/VendorOrders/PendingApprovals?pagenumber=1&pagesize=10";
            client.DefaultRequestHeaders.Accept.
               Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);
            client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOi" +
    "IxIiwiVXNlcm5hbWUiOiJNYW5nZXNoIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW5" +
    "0aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIlJvbGVJZCI6IjQiLCJGaXJzdG5hbWUiOiJNYW5nZXNoIiwiTGFz" +
    "dG5hbWUiOiJOYXVrYXJrYXIiLCJleHAiOjE1NzcwMjYwNjMsImlzc" +
    "yI6ImFwaS5jb20iLCJhdWQiOiJjbGllbnQuY29tIn0.YcDdsmXMzvS6gy5hohJLC6Y0uSW-xq8BYlFKJuRvA9M");
            var response = await client.GetAsync(client.BaseAddress + EndPoint);
            return JsonConvert.DeserializeObject<ListofVendorOrderDetails>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
