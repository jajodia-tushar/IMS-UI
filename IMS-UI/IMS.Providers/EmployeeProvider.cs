using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using IMS_UI.IMS.Models.Admin;

namespace IMS_UI.IMS.Providers
{
    public class EmployeeProvider : IEmployeeProvider
    {
        private IConfiguration _iconfiguration;
        SessionManager _sessionManager;
        public EmployeeProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            this._sessionManager = sessionManager;
        }

        public async Task<EmployeesResponse> AddEmployee(Employee employee)
        {
            using (HttpClient http = new HttpClient())
            {
                PrepareClient(http);
                JObject employeeJson = JsonMaker(employee);
                var response = await http.PostAsJsonAsync("api/employee", employeeJson);
                return await EmployeeResultParser(response);
            }
        }

        public async Task<EmployeesResponse> EditEmployee(Employee employee)
        {
            using (HttpClient http = new HttpClient())
            {
                PrepareClient(http);
                JObject employeeJson = JsonMaker(employee);
                var response = await http.PutAsJsonAsync("api/employee", employeeJson);
                return await EmployeeResultParser(response);
            }
        }

        private async Task<Response> ResultParser(HttpResponseMessage response)
        {
            Response apiResponse = new EmployeesResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<Response>(result);
            return apiResponse;
        }

        private async Task<EmployeesResponse> EmployeeResultParser(HttpResponseMessage response)
        {
            EmployeesResponse apiParsedResponse = new EmployeesResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiParsedResponse = JsonConvert.DeserializeObject<EmployeesResponse>(result);
            return apiParsedResponse;
        }

        public async Task<EmployeesResponse> GetAllEmployee(string filter,string pageNumber, string pageSize)
        {
            using (HttpClient http = new HttpClient())
            {
                try
                {
                    using (HttpClient _client = new HttpClient())
                    {
                        var EndPoint = Constants.APIEndpoints.EmployeeProvider;
                        UriBuilder uriBuilder =
                            new UriBuilder(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]) + EndPoint);
                        _client.DefaultRequestHeaders.Accept.Add(
                           new MediaTypeWithQualityHeaderValue("application/json"));
                        _client.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
                        string query;
                        if (filter == "undefined")
                        {
                            query = $"?pageNumber={int.Parse(pageNumber)}&pageSize={int.Parse(pageSize)}";
                        }
                        else
                        {
                            query = $"?filter={filter}&pageNumber={int.Parse(pageNumber)}&pageSize={int.Parse(pageSize)}";
                        }
                            var response = await _client.GetAsync(uriBuilder.Uri+query);
                        return JsonConvert.DeserializeObject<EmployeesResponse>(
                           await response.Content.ReadAsStringAsync());
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        private JObject JsonMaker(Employee employee)
        {
            string jsonString = JsonConvert.SerializeObject(employee);
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        private void PrepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]));
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }

        public async Task<Response> DeactivateEmployee(string id, bool isHardDelete)
        {
            using (HttpClient http = new HttpClient())
            {
                PrepareClient(http);
                var response = await http.DeleteAsync("api/employee?id=" + id.ToString() + "&isHardDelete=" + isHardDelete.ToString());
                return await ResultParser(response);
            }
        }

        public async Task<EmployeeResponse> ValidateEmployee(string employeeId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.EmployeeProvider;
            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));
            var response = await client.GetAsync(client.BaseAddress + EndPoint + employeeId);
            return JsonConvert.DeserializeObject<EmployeeResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<Response> IsUniqueEmployeeId(string employeeId)
        {
            using (HttpClient http = new HttpClient())
            {
                PrepareClient(http);

                var response = await http.GetAsync("api/employee/IdExists?employeeId=" + employeeId);
                return await ResultParser(response);
            }
        }

        public async Task<Response> IsUniqueEmployeeEmail(string email)
        {
            using (HttpClient http = new HttpClient())
            {
                PrepareClient(http);
                var response = await http.GetAsync("api/employee/email?email=" + email);
                return await ResultParser(response);
            }
        }

        public async Task<EmployeeOrdersResponse> GetEmployeeOrders(string toDate, string fromDate, string pageNumber, string pageSize, string employeeId)
        {
            try
            {
                var endPoint = Constants.APIEndpoints.EmployeeOrder;
                UriBuilder uriBuilder =
                new UriBuilder(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"]) + endPoint);
                using (HttpClient _client = new HttpClient())
                {
                    _client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
                    _client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
                    string query;
                    using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("pageNumber", pageNumber),
                new KeyValuePair<string, string>("pageSize", pageSize),
                new KeyValuePair<string, string>("endDate", toDate),
                new KeyValuePair<string, string>("employeeId", employeeId),
                new KeyValuePair<string, string>("startDate", fromDate),

            }))
                    {
                        query = content.ReadAsStringAsync().Result;
                    }

                    uriBuilder.Query = query;

                    var response = await _client.GetAsync(uriBuilder.Uri);
                    return JsonConvert.DeserializeObject<EmployeeOrdersResponse>(
                        await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<EmployeeBulkOrdersResponse> PostBulkOrder(EmployeeBulkOrder employeeBulkOrder)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.PlaceEmployeeBulkOrder;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var myData = JsonConvert.SerializeObject(employeeBulkOrder);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<EmployeeBulkOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }
        public async Task<EmployeeOrderResponse> PostOrders(EmployeeOrder placeEmployeeOrderRequest)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.EmployeeOrder;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var myData = JsonConvert.SerializeObject(placeEmployeeOrderRequest);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);
            var byteData = new ByteArrayContent(buffer);
            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(client.BaseAddress + EndPoint, byteData);
            return JsonConvert.DeserializeObject<EmployeeOrderResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<EmployeeBulkOrdersResponse> GetEmployeeBulkOrderById(int orderId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.bulkOrderDetails;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                         new AuthenticationHeaderValue("Bearer", token);

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var response = await client.GetAsync(client.BaseAddress + EndPoint + orderId);

            return JsonConvert.DeserializeObject<EmployeeBulkOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<Response> CancelEmployeeBulkOrder(int orderId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.bulkOrderCancel;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                         new AuthenticationHeaderValue("Bearer", token);

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var response = await client.PutAsync(client.BaseAddress + EndPoint + orderId + "/Cancel", null);

            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<Response> RejectEmployeeBulkOrder(int orderId)
        {
            HttpClient client = new HttpClient();
            var EndPoint = Constants.APIEndpoints.bulkOrderCancel;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                         new AuthenticationHeaderValue("Bearer", token);

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var response = await client.PutAsync(client.BaseAddress + EndPoint + orderId + "/Reject", null);

            return JsonConvert.DeserializeObject<Response>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<ApproveBulkOrderResponse> ApproveEmployeeBulkOrder(int orderId, ApproveEmployeeBulkOrder approveEmployeeBulkOrder)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.bulkOrderApprove;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var myData = JsonConvert.SerializeObject(approveEmployeeBulkOrder);

            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);

            var byteData = new ByteArrayContent(buffer);

            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await client.PutAsync(client.BaseAddress + EndPoint + orderId + "/Approve", byteData);

            return JsonConvert.DeserializeObject<ApproveBulkOrderResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<StockStatusResponse> GetStockStatus(int pageNumber, int pageSize, string itemIds)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.GetStockStatus;

            UriBuilder uriBuilder =
                new UriBuilder(Environment.GetEnvironmentVariable(_iconfiguration["BASEURL"] + EndPoint));

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));



            string query;
            using (var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("pageNumber", pageNumber.ToString()),
                new KeyValuePair<string, string>("pageSize", pageSize.ToString()),
                new KeyValuePair<string, string>("itemIds",itemIds),


            }))
            {
                query = content.ReadAsStringAsync().Result;
            }

            uriBuilder.Query = query;

            var response =
                await client.GetAsync(uriBuilder.Uri);

            return JsonConvert.DeserializeObject<StockStatusResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task<EmployeeBulkOrdersResponse> ReturnBulkOrderById(int orderId, EmployeeBulkOrder employeeBulkOrder)
        {
            HttpClient client = new HttpClient();

            var EndPoint = Constants.APIEndpoints.bulkOrderApprove;

            client.DefaultRequestHeaders.Accept.
                Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var token = _sessionManager.GetString("token");

            client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token);

            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable(_iconfiguration["BaseURL"]));

            var myData = JsonConvert.SerializeObject(employeeBulkOrder);

            var buffer = System.Text.Encoding.UTF8.GetBytes(myData);

            var byteData = new ByteArrayContent(buffer);

            byteData.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await client.PutAsync(client.BaseAddress + EndPoint + orderId + "/return", byteData);

            return JsonConvert.DeserializeObject<EmployeeBulkOrdersResponse>(
                await response.Content.ReadAsStringAsync());
        }
    }
}