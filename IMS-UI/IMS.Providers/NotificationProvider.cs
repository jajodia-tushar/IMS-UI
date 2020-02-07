using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Notification;
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
    public class NotificationProvider : INotificationProvider
    {
        private IConfiguration _iConfiguration;
        private SessionManager _sessionManager;

        public NotificationProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iConfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public async Task<NotificationResponse> GetAllNotifications(int pageNumber, int pageSize)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var EndPoint = Constants.APIEndpoints.NotificationProvider;

                    UriBuilder uri = new UriBuilder(Environment.GetEnvironmentVariable(_iConfiguration["BaseURL"]) + EndPoint);

                    client.DefaultRequestHeaders.Accept.
                        Add(item: new MediaTypeWithQualityHeaderValue("application/json"));

                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[] {

                        new KeyValuePair<string, string>("pageNumber", pageNumber.ToString()),
                        new KeyValuePair<string, string>("pageSize", pageSize.ToString())

                    }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }

                    uri.Query = query;

                    var response = await client.GetAsync(uri.Uri);

                    return JsonConvert.DeserializeObject<NotificationResponse>(
                        await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
