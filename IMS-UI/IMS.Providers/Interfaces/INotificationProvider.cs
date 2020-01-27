using IMS_UI.IMS.Models.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface INotificationProvider
    {
        Task<NotificationResponse> GetAllNotifications(int pageNumber, int pageSize);
    }
}
