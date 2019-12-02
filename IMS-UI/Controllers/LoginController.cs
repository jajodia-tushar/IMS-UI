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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private LoginProvider _loginProvider;
        private SessionManager _sessionManager;
        public LoginController(LoginProvider loginProvider,SessionManager sessionManager)
        {
            _loginProvider = loginProvider;
            _sessionManager = sessionManager;
        }
        // POST: api/Login
        [HttpPost]
        public async Task<IActionResult> PostLoginAsync([FromBody] LoginRequest loginRequest)
        {
            try
            {
                //var provider = new LoginProvider();
                var response = await _loginProvider.ApiCaller(loginRequest, "/api/Login");
                if (response.Error == null)
                {    
                    _sessionManager.SetString("token",response.AccessToken);
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
