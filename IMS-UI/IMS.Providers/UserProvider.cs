using IMS_UI.IMS.Core;
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
        public async Task<UsersResponse> AddUser(User user)
        {
            using (HttpClient http = new HttpClient())
            {
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + Constants.APIEndpoints.Users);
                prepareClient(http);
                JObject userJson = JsonMaker(user);
                var response = await http.PostAsJsonAsync(uriBuilder.Uri, userJson);
                return await UsersResultParser(response);
            }
        }

        public async Task<UsersResponse> EditUser(User user, string remark)
        {
            using (HttpClient http = new HttpClient())
            {
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + Constants.APIEndpoints.Users);
                prepareClient(http);
                prepareQuery(uriBuilder,new Dictionary<string, string>() {["remark"] = remark });
                JObject userJson = JsonMaker(user);
                var response = await http.PutAsJsonAsync(uriBuilder.Uri, userJson);
                return await UsersResultParser(response);
            }
        }

        

        private async Task<Response> ResultParser(HttpResponseMessage response)
        {
            Response apiResponse = new UsersResponse();
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
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + Constants.APIEndpoints.Users);
                prepareClient(http);
                var response = await http.GetAsync(uriBuilder.Uri);
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
            http.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));
        }

        private void prepareQuery(UriBuilder uriBuilder, Dictionary<string,string> queryParams)
        {
            var content = new FormUrlEncodedContent(
                queryParams.ToList<KeyValuePair<string, string>>()
        );
            uriBuilder.Query = content.ReadAsStringAsync().Result;
        }

        public async Task<Response> DeactivateUser(int userId, bool isHardDelete,string remark)
        {
            using (HttpClient http = new HttpClient())
            {
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + Constants.APIEndpoints.Users+ userId.ToString());
                prepareClient(http);
                
                var response = await http.DeleteAsync("api/user/"+ userId.ToString()+"?isHardDelete="+"False");
                return await ResultParser(response);
            }
        }

        public async Task<Response> IsUserNameUnique(string username)
        {
            using (HttpClient http = new HttpClient())
            {
                UriBuilder uriBuilder =
                new UriBuilder(_iconfiguration["BASEURL"] + Constants.APIEndpoints.UsersUserNameUnique);
                prepareClient(http);

                var response = await http.GetAsync(uriBuilder.Uri + "?username=" + username);
                return await ResultParser(response);
            }
        }

        public async Task<Response> IsEmailNameUnique(string email)
        {
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.GetAsync("api/user/email?email=" + email);
                return await ResultParser(response);
            }
        }

        public async Task<UsersResponse> getAllAdmins()
        {
            try
            {
                string path = Constants.APIEndpoints.getAllAdmins;
                using (HttpClient http = new HttpClient())
                {
                    prepareClient(http);
                    var response = await http.GetAsync(path);
                    var result = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<UsersResponse>(result);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<RolesResponse> GetAllRoles()
        {
            string path = Constants.APIEndpoints.getAllRoles;
            using (HttpClient http = new HttpClient())
            {
                prepareClient(http);
                var response = await http.GetAsync(path);
                var result = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<RolesResponse>(result);
            }
        }
    }
}
