using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxLimit { get; set; }
        public bool IsActive { get; set; }
        public string ImageUrl { get; set; }
        public double Rate { get; set; }
    }
}
