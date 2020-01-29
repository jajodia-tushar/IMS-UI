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
            public const string EmployeeProvider = "api/Employee/";
            public const string AuditLogs = "api/ActivityLogs";
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
            public const string Users = "api/user/";
            public const string UsersUserNameUnique = "api/user/username";
            public const string UsersEmailUnique = "api/user/email";


            public const string VendorOrdersProvider = "api/order/VendorOrders/";

            public const string VendorOrderProvider = "api/order/VendorOrders/";

            public const string StoreProvider = "api/Reports/GetStockStatus";

            public const string StoreTransferProvider = "api/transfer/transferToShelves";
            public const string getAllAdmins = "api/User/Role/admin";
            public const string getAllVendors = "api/vendor";
            public const string getAllRoles= "api/roles";
            public const string PerDayConsumptionReports= "api/reports/GetItemConsumptionReports";
            public const string ItemConsumptionReports= "api/Reports/GetDateWiseItemConsumptionDetails";

            public const string NotificationProvider = "api/notification";

            public const string GetItemConsumptionReports= "api/reports/GetItemConsumptionReports";
            public const string PlaceEmployeeBulkOrder = "api/order/EmployeeBulkOrders";
            public const string particularVendorOrder = "api/Order/Vendors/";
            public const string vendorEndpoint = "api/Vendor";
            public const string vendorIsUniqueEndpoint="api/Vendor/IsUnique";
        }
    }

}
