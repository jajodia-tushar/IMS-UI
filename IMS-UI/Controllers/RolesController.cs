using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public RolesController(IRolesProvider rolesProvider)
        {
            this._rolesProvider = rolesProvider;
        }
        [HttpGet]
        public async Task<RolesResponse> GetAllAllowedRoles()
        {
            var response = await this._rolesProvider.GetAllRoles();
            return response;
        }
    }
}