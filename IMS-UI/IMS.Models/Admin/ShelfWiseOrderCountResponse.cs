﻿using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.Contracts
{
    public class ShelfWiseOrderCountResponse: Response
    {
        public List<DateShelfOrderMapping> DateWiseShelfOrderCount;
    }
}
