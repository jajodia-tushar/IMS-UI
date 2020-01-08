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
            var EndPoint = "api/order/VendorOrders/?pagenumber=1&isApproved=false&pagesize=10";
            client.DefaultRequestHeaders.Accept.
               Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _SessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);
    
            var response = await client.GetAsync(client.BaseAddress + EndPoint);
            return JsonConvert.DeserializeObject<ListofVendorOrderDetails>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
