using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
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
                    http.BaseAddress = new Uri(_IConfiguration["BASEURL"]);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    var token = _SessionManager.GetString("token");
                    http.DefaultRequestHeaders.Authorization =
                                new AuthenticationHeaderValue("Bearer", token);
                    var response = await http.GetAsync(path);
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

