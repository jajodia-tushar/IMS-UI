﻿using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
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
    public class VendorListProvider
    {
        private IConfiguration _IConfiguration;
        private SessionManager _SessionManager;

        public VendorListProvider(IConfiguration config, SessionManager sessionManager)
        {
            _IConfiguration = config;
            _SessionManager = sessionManager;
        }
        public async Task<VendorResponse> ApiGetCaller(string path)
        {
            try
            {
                using (HttpClient http = new HttpClient())
                {
                    UriBuilder uriBuilder = new UriBuilder(_IConfiguration["BASEURL"] + path);
                    
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _SessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);

                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                        new KeyValuePair<string, string>("pageNumber", "1"),
                        new KeyValuePair<string, string>("pagesize", int.MaxValue.ToString())
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
    }
}

