using IMS_UI.IMS.Core.Infra;
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
using System.Text;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class UserProvider : IUserProvider
    {
        private IConfiguration _iconfiguration;
        private SessionManager _sessionManager;

        public UserProvider(IConfiguration configuration, SessionManager sessionManager)
        {
            _iconfiguration = configuration;
            _sessionManager = sessionManager;
        }
        public async Task<UserResponse> AddUser(User user)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                JObject userJson = JsonMaker(user);
                var response = await http.PostAsJsonAsync("api/user", userJson);
                return await UserResultParser(response);
            }
        }


        

        public async Task<UserResponse> EditUser(User user)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                JObject userJson = JsonMaker(user);
                var response = await http.PutAsJsonAsync("api/user", userJson);
                return await UserResultParser(response);
            }
        }

        private async Task<UserResponse> UserResultParser(HttpResponseMessage response)
        {
            UserResponse apiResponse = new UserResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<UserResponse>(result);
            return apiResponse;
        }

        private async Task<Response> ResultParser(HttpResponseMessage response)
        {
            Response apiResponse = new UserResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiResponse = JsonConvert.DeserializeObject<Response>(result);
            return apiResponse;
        }

        private async Task<UsersResponse> UsersResultParser(HttpResponseMessage response)
        {
            UsersResponse apiParsedResponse = new UsersResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiParsedResponse = JsonConvert.DeserializeObject<UsersResponse>(result);
            return apiParsedResponse;
        }

        public async Task<UsersResponse> GetAllUsers()
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.GetAsync("api/user");
                return await UsersResultParser(response);
            }
        }

        private JObject JsonMaker(User user)
        {
            string jsonString = JsonConvert.SerializeObject(user);
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        private void prepareClient(HttpClient http)
        {
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }

        public async Task<Response> DeactivateUser(User user)
        {
            using (HttpClient http = new HttpClient())
            {
              
                HttpRequestMessage request = new HttpRequestMessage
                {
                    Content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json"),
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri(_iconfiguration["BASEURL"]+"api/user")
                };
                request.Headers.Add("Authorization", "Bearer " + _sessionManager.GetString("token"));
                var response = await http.SendAsync(request);
                return await ResultParser(response);
            }
        }
    }
}
