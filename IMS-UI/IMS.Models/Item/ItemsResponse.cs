using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class ItemsResponse : Response
    {
        public List<Item> Items { get; set; }
    }
}
