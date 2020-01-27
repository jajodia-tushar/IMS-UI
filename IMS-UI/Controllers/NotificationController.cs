using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotificationProvider _notificationProvider;
        private SessionManager _sessionManager;

        public NotificationController(INotificationProvider notificationProvider, SessionManager sessionManager)
        {
            _notificationProvider = notificationProvider;
            _sessionManager = sessionManager;
        }

        // GET: api/notification
        [HttpGet]
        public async Task<IActionResult> GetAllNotifications(int pageNumber, int pageSize)
        {
            try
            {
                var response = await _notificationProvider.GetAllNotifications(pageNumber, pageSize);

                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}
