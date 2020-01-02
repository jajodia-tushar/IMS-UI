using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS_UI.IMS.Providers
{
    public class TransferProvider
    {
        private IConfiguration configuration;
        private SessionManager sessionManager;

        public TransferProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            this.configuration = configuration;
            this.sessionManager = sessionManager;
        }

        public async Task<Response> TransferToShelf(TransferToShelvesRequest request)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var content = new ObjectContent<TransferToShelvesRequest>(request, new JsonMediaTypeFormatter());
                    var Json = JObject.Parse(JsonConvert.SerializeObject(request));
                    client.BaseAddress = new Uri(configuration["BASEURL"]);
                    client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", sessionManager.GetString("token"));
                    HttpMethod method = new HttpMethod("PATCH");
                    var httpRequest = new HttpRequestMessage(method, client.BaseAddress + "api/transfer/transferToShelves") {
                        Content = content
                    };
                    var response = await client.SendAsync(httpRequest);
                    return JsonConvert.DeserializeObject<Response>(
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
