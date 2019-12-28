using IMS_UI.IMS.Core.Infra;
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
        private SessionManager _SessionManager;
        public VendorOrderListProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _SessionManager = sessionManager;
        }
        public async Task<ListofVendorOrderDetails> getorderdetails()
        {
            HttpClient client = new HttpClient();
            var EndPoint = "api/order/VendorOrders/PendingApprovals?pagenumber=1&pagesize=10";
            client.DefaultRequestHeaders.Accept.
               Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _SessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);
    //        client.DefaultRequestHeaders.Authorization =
    //new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOi" +
    //"IyOSIsIlVzZXJuYW1lIjoic3VwZXJhZG1pbkAxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltc" +
    //"y9yb2xlIjoiU3VwZXJBZG1pbiIs" +
    //"IlJvbGVJZCI6IjQiLCJGaXJzdG5hbWUiOiJNYW5nZXNoIiwiTGFzdG5hbWUiOiJOYXVrYXJrYXIiLCJleHAiOjE1Nzc1MzI2NDAsImlzcyI6ImFwaS5" +
    //"jb20iLCJhdWQiOiJjbGllbnQuY29tIn0.Vk1" +
    //"T2ZDG0DdCKMCaQ-eSXNqUA0E-H-zQLPxC797C0TQ");
            var response = await client.GetAsync(client.BaseAddress + EndPoint);
            return JsonConvert.DeserializeObject<ListofVendorOrderDetails>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
