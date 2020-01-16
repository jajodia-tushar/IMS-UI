using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Models.Vendor;
using IMS_UI.IMS.Providers.Interfaces;
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
    public class VendorOrderListProvider: IPendingVendorOrdersProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _SessionManager;
        public VendorOrderListProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _SessionManager = sessionManager;
        }
        public async Task<ListofVendorOrderDetails> GetVendorPendingApprovals(string pageNo, string pageSize)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.VendorOrdersProvider;

            UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + EndPoint);

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _SessionManager.GetString("token"));

            // client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("isApproved", "false"),
                new KeyValuePair<string, string>("pageNumber", pageNo),
                new KeyValuePair<string, string>("pageSize", pageSize),
               
              

            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<ListofVendorOrderDetails>(
                await response.Content.ReadAsStringAsync());
        }

       
    }
}
