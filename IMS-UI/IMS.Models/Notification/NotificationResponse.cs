using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Notification
{
    public class NotificationResponse : Response
    {
        public List<Notification> Notifications { get; set; }
    }
}
