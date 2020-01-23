using System;
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
            public const string EmployeeOrder = "api/order/EmployeeOrders";
            public const string RAGStatusProvider = "api/reports/getragstatus";
            public const string ShelfProviderShelfData = "api/inventory/";
            public const string ShelfProviderGetShelf = "api/Shelf/";
            public const string ShelfWiseOrderCountProvider = "api/reports/getshelfwiseordercount";
            public const string reportsGetRAGReports = "api/Reports/GetItemsAvailability";

            public const string LoginProviderLogout = "api/logout";

            public const string VendorOrdersProvider = "api/order/VendorOrders/";

            public const string StoreProvider = "api/Reports/GetStockStatus";

            public const string StoreTransferProvider = "api/transfer/transferToShelves";
            public const string getAllAdmins = "api/User/Role/admin";
            public const string getAllVendors = "api/vendor";
            public const string getAllRoles= "api/roles";
            public const string GetItemConsumptionReports= "api/reports/GetItemConsumptionReports";

        }
    }

}
