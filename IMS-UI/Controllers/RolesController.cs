using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        IRolesProvider _rolesProvider;
        SessionManager sessionManager;

        public RolesController(IRolesProvider rolesProvider, SessionManager sessionManager)
        {
            this._rolesProvider = rolesProvider;
            this.sessionManager = sessionManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAllowedRoles()
        {
            try
            {
            var response = await this._rolesProvider.GetAllRoles();
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