using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionManagerController : ControllerBase
    {
        private SessionProvider _sessionProvider;
        public SessionManagerController(SessionProvider service){
            _sessionProvider = service;
        }

        // GET: api/session
        [HttpGet]
        public IActionResult Get(){
            try{
                return Ok(_sessionProvider.getSession());
            }
            catch(Exception e){
                return StatusCode(500);
            }  
        }

        [HttpPut]
        public async Task<IActionResult> PostShelfId([FromBody] Shelf shelf)
        {
            return Ok(this._sessionProvider.postShelfData(shelf));

        }
    }
}
