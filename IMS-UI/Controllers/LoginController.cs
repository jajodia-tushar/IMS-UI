using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private LoginProvider _LoginProvider;
        private SessionManager _SessionManager;
         
        public LoginController(LoginProvider loginProvider,SessionManager sessionManager)
        {
            _LoginProvider = loginProvider;
            _SessionManager = sessionManager;
        }
        // POST: api/Login
        [HttpPost]
        public async Task<IActionResult> PostLoginAsync([FromBody] LoginRequest loginRequest)
        {
            try
            {
                //var provider = new LoginProvider();
                var response = await _LoginProvider.ApiCaller(loginRequest, "/api/Login");
                if (response.Error == null)
                {    
                    _SessionManager.SetString("token",response.AccessToken);
                    _SessionManager.SetString("role", response.User.Role.Name);
                    _SessionManager.SetString("username", response.User.Firstname + " " + response.User.Lastname);
                    return Ok(response);
                }
                
                else
                    return Unauthorized("invalid Credentials");
            }
            catch(Exception e)
            {
                return StatusCode(500);
            }
                     
        }
    }
}
