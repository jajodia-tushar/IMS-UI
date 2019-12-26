using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public UserController(IUserProvider userProvider)
        {
            this._userProvider = userProvider;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            var response = await _userProvider.AddUser(user);
            if(response!=null)
                return Ok(response);
            return BadRequest(response);
        }

        [HttpPut]
        public async Task<UserResponse> EditUserDetails([FromBody] User user)
        {
            var response = await _userProvider.EditUser(user);
            return response;
        }

        [HttpGet]
        public async Task<UsersResponse> GetAllUsers()
        {
            var response = await _userProvider.GetAllUsers();
            return response;
        }

        [HttpDelete]
        public async Task<Response> DeactivateUser([FromBody] User user)
        {
            var response = await _userProvider.DeactivateUser(user);
            return response;
        }
    }
}
