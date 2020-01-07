using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace IMS_UI.IMS.Models.Admin
{
    public class StockStatus
    {
        public int Quantity { get; set; }
        public string Location { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Colour Colour { get; set; }
    }
}