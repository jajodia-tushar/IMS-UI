using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
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
    public class VendorOrderApprovalProvider : IVendorOrderApprovalProvider
    {


       
            private IConfiguration _iconfiguration;
        private SessionManager _SessionManager;
        public VendorOrderApprovalProvider(IConfiguration configuration, SessionManager sessionManager)
            {
                _iconfiguration = configuration;
            _SessionManager = sessionManager;
        }
            public async Task<Response> Approve(VendorOrder vendorOrder)
            {
                HttpClient client = new HttpClient();
                var EndPoint = "api/order/VendorOrders/PendingApprovals";

                client.DefaultRequestHeaders.Accept.
                    Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var token = _SessionManager.GetString("token");
            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);
            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

                var myData = JsonConvert.SerializeObject(vendorOrder);
                var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
                var byteData = new ByteArrayContent(buffer);
                byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await client.PutAsync(client.BaseAddress + EndPoint, byteData);
                return JsonConvert.DeserializeObject<Response>(
                    await response.Content.ReadAsStringAsync());
            }
        }
    }

