﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Core
{
    public static class Constants
    {
        public static class APIEndpoints
        {
            public const string EmployeeProvider = "api/employee/";
            public const string FrequentlyUsedItemProvider = "api/reports/getmostconsumeditems";
            public const string ItemWiseAnalysisProvider = "api/reports/getitemconsumption";
            public const string LoginProvider = "api/Login";
            public const string OrderProvider = "api/order/EmployeeOrders";
            public const string RAGStatusProvider = "api/reports/getragstatus";
            public const string RecentEntriesProvider = "api/Order/EmployeeRecentOrderDetails";
            public const string ShelfProviderShelfData = "api/inventory/";
            public const string ShelfProviderGetShelf = "api/Shelf/";
            public const string ShelfWiseOrderCountProvider = "api/reports/getshelfwiseordercount";

            public const string LoginProviderLogout = "api/logout";



        }
    }

}