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
                JObject userJson = JsonMaker(user, http);
                var response = await http.PostAsJsonAsync("api/user", userJson);
                return await ResultParser(response);
            }
        }


        

        public async Task<UserResponse> EditUser(User user)
        {
            using (HttpClient http = new HttpClient())
            {
                JObject userJson = JsonMaker(user, http);
                var response = await http.PutAsJsonAsync("api/user", userJson);
                return await ResultParser(response);
            }
        }

        private async Task<UserResponse> ResultParser(HttpResponseMessage response)
        {
            UserResponse apiLoginResponse = new UserResponse();
            var result = await response.Content.ReadAsStringAsync();
            apiLoginResponse = JsonConvert.DeserializeObject<UserResponse>(result);
            return apiLoginResponse;
        }

        private JObject JsonMaker(User user, HttpClient http)
        {
            string jsonString = JsonConvert.SerializeObject(user);
            http.BaseAddress = new Uri(_iconfiguration["BASEURL"]);
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
            JObject Json = JObject.Parse(jsonString);
            return Json;
        }

        public Task<UsersResponse> GetAllUsers()
        {
            throw new NotImplementedException();
        }
    }
}
