    using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class LoginProvider : ILoginProvider
    {
        
        private IHttpContextAccessor _httpContextAccessor;
        private SessionManager _sessionManager;
        private IConfiguration _Configuration; 

        public LoginProvider(IHttpContextAccessor httpContextAccessor,SessionManager sessionManager,
                                IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _sessionManager = sessionManager;
            _Configuration = configuration;
        }



        public async Task<LoginResponse>  ApiCaller(Object requestData)
        {
            try
            {
                var jsonString = JsonConvert.SerializeObject(requestData);
                var endPoint = Constants.APIEndpoints.LoginProvider;
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(_Configuration["BASEURL"]);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                    JObject Json = JObject.Parse(jsonString);
                    http.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

                    var response = await http.PostAsJsonAsync(endPoint, Json);
                    LoginResponse apiLoginResponse = new LoginResponse();
                    var result = await response.Content.ReadAsStringAsync();
                    apiLoginResponse = JsonConvert.DeserializeObject<LoginResponse>(result);
                    return apiLoginResponse;
                }                
            }
            catch(Exception e)
            {
                throw e;
            }
            
        }

        public async Task<Response> LogOut()
        {
            try
            {
                var endPoint = Constants.APIEndpoints.LoginProviderLogout;
                using (HttpClient http = new HttpClient())
                {
                    http.BaseAddress = new Uri(_Configuration["BASEURL"]);
                    http.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                    http.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _sessionManager.GetString("token"));

                    var response = await http.DeleteAsync(endPoint);
                    Response apiResponse = new Response();
                    var result = await response.Content.ReadAsStringAsync();

                    apiResponse = JsonConvert.DeserializeObject<Response>(result);
                    return apiResponse;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }


    }
}
