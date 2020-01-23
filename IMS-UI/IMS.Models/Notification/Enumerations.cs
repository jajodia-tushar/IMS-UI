using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Notification
{
    public class Enumerations
    {
        public enum RequestStatus
        {
            Pending,
            Rejected,
            Approved,
            Edited
        }

        public enum RequestType
        {
            VendorOrder,
            BulkOrder,
            UserModification
        }
    }
}
