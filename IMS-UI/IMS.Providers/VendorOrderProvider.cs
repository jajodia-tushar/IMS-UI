﻿using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
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
    }
}