using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using System.Collections.Generic;

namespace IMS_UI.IMS.Providers
{
    public class EmployeeOrderProvider : IEmployeeOrderProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public EmployeeOrderProvider(IConfiguration configuration,SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }

        public Task<EmployeeOrdersResponse> GetEmployeeOrders(string toDate, string fromDate, string pageNumber, string pageSize, string employeeId)
        {
            throw new NotImplementedException();
        }

        public Task<EmployeeBulkOrdersResponse> PostBulkOrder(EmployeeBulkOrder employeeBulkOrder)
        {
            throw new NotImplementedException();
        }

        public async Task<EmployeeOrderResponse> PostOrders(EmployeeOrder placeEmployeeOrderRequest)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.EmployeeOrder;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(_iconfiguration["BaseURL"]);

            var myData = JsonConvert.SerializeObject(placeEmployeeOrderRequest);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<EmployeeOrderResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}
