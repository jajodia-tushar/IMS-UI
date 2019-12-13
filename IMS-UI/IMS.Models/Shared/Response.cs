using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class Response
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }

        public Error Error { get; set; }
    }
}