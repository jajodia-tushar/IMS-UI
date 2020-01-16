using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMS_UI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserProvider _userProvider;
        private SessionManager sessionManager;

        public UserController(IUserProvider userProvider, SessionManager sessionManager)
        {
            this.sessionManager = sessionManager;
            this._userProvider = userProvider;
        }

        [HttpGet("username")]
        public async Task<IActionResult> CheckUsernameIsUnique(string username)
        {
            try
            {
                var response = await _userProvider.IsUserNameUnique(username);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("email")]
        public async Task<IActionResult> CheckEmailIsUnique(string email)
        {
            try
            {
                var response = await _userProvider.IsEmailNameUnique(email);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var response = await _userProvider.GetAllUsers();
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            try
            {
                var response = await _userProvider.AddUser(user);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditUserDetails([FromBody] User user)
        {
            try
            {
                var response = await _userProvider.EditUser(user);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeactivateUser(int userId, bool isHardDelete)
        {
            try
            {
                var response = await _userProvider.DeactivateUser(userId, isHardDelete);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{Admin}")]
        public async Task<IActionResult> GetAllAdmins()
        {
            try
            {
                var response = await  _userProvider.getAllAdmins();
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }
    }
}
