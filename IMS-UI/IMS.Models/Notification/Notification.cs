using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static IMS_UI.IMS.Models.Notification.Enumerations;

namespace IMS_UI.IMS.Models.Notification
{
    public class Notification
    {
        public int RequestId { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public RequestType RequestType { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public RequestStatus RequestStatus { get; set; }
        public string RequestedBy { get; set; }
        public DateTime LastModified { get; set; }
    }
}
