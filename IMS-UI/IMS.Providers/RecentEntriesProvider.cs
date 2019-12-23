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
    public class RecentEntriesProvider
    {
        IConfiguration _configuration;
        private SessionManager _sessionManager;
        public RecentEntriesProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _configuration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<EmployeeRecentOrderResponse> GetRecentEntries()
        {
           try
            {
                using (HttpClient _client = new HttpClient())
                {
                    _client.BaseAddress = new Uri(_configuration["BASEURL"]);
                    _client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
                    var response = await _client.GetAsync("api/Order/EmployeeRecentOrderDetails");
                    return JsonConvert.DeserializeObject<EmployeeRecentOrderResponse>(
                        await response.Content.ReadAsStringAsync());
                }
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
