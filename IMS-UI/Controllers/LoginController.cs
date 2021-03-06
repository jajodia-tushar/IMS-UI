using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS_UI.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private ILoginProvider _loginProvider;
        private SessionManager _SessionManager;
         
        public LoginController(ILoginProvider loginProvider,SessionManager sessionManager)
        {
            _loginProvider = loginProvider;
            _SessionManager = sessionManager;
        }
        // POST: api/Login
        [HttpPost("login")]
        public async Task<IActionResult> PostLoginAsync([FromBody] LoginRequest loginRequest)
        {
            try
            {
                //var provider = new LoginProvider();
                var response = await _loginProvider.ApiCaller(loginRequest);
                if (response.Error == null)
                {
                    _SessionManager.SetString("token", response.AccessToken);
                    _SessionManager.SetObject("user", response.User);
                    return Ok(new UILoginResponse{user = response.User});
                }
                
                else
                    return Unauthorized("invalid Credentials");
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
                     
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            var user = (User)_SessionManager.GetObject<User>("user");
                UserResponse userResponse = new UserResponse
                {
                    user = user
                };
                return Ok(userResponse);
        }

        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
           var response = await _loginProvider.LogOut();

            if(response.Status == Status.Success)
            {
                _SessionManager.ClearSession();
                return Ok(response);
            }
            else
            {
                return Ok(new Response
                {
                    Status = Status.Failure
                });
            }
        }

        [HttpPatch("updatePassword/{userId}")]
        public async Task<IActionResult> UpdateUserPassword(int userId, [FromBody] ChangePasswordDetails changePasswordDetails)
        {
            try
            {
                var response = await _loginProvider.ChangePassword(userId, changePasswordDetails);
                if (response.Error == null)
                {
                    _SessionManager.ClearSession();
                }
                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}
