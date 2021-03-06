import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminHeader } from './Components/admin-header/admin-header.component';
import { MainnavComponent } from './Components/mainnav/mainnav.component';
import { RagStatusComponent } from './Components/rag-status/rag-status.component';
import { ChartsComponentComponent } from './Components/charts-component/charts-component.component';
import { RecentEntriesComponent } from './Components/recent-entries/recent-entries.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { LineChartComponent } from './Components/line-chart/line-chart.component';
import { StoreComponent } from './Components/store/store.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { UserManageDialogComponent } from './Components/user-manage-dialog/user-manage-dialog.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserManageFormComponent } from './Components/user-manage-form/user-manage-form.component';
import { DeactivateDialogComponent } from './Components/deactivate-dialog/deactivate-dialog.component';
import { DetailsPipe } from './Components/recent-entries/details.pipe';
import { InvoiceEditorComponent } from './Components/invoice-editor/invoice-editor.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsTableComponent } from './Components/reports-table/reports-table.component';
import { ReportsTabsComponent } from './Components/reports-tabs/reports-tabs.component';
import { ItemManagementComponent } from './Components/item-management/item-management.component';
import { StoreUpdateComponent } from './Components/store-update/store-update.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ImageDialogComponent } from './Components/image-dialog/image-dialog.component';
import { ItemListComponent } from './Components/item-list/item-list.component';
import { ItemManageDialogComponent } from './Components/item-manage-dialog/item-manage-dialog.component';
import { ItemManageFormComponent } from './Components/item-manage-form/item-manage-form.component';
import { ItemDeactivateDialogComponent } from './Components/item-deactivate-dialog/item-deactivate-dialog.component';
import { EmployeeManagementComponent } from './Components/employee-management/employee-management.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeManageDialogComponent } from './Components/employee-manage-dialog/employee-manage-dialog.component';
import { EmployeeManageFormComponent } from './Components/employee-manage-form/employee-manage-form.component';
import { DeactivateDialogcomponentEmployeeComponent } from './Components/deactivate-dialogcomponent-employee/deactivate-dialogcomponent-employee.component';
import { VendorManagementComponent } from './Components/vendor-management/vendor-management.component';
import { VendorListComponent } from './Components/vendor-list/vendor-list.component';
import { VendorManageDialogComponent } from './Components/vendor-manage-dialog/vendor-manage-dialog.component';
import { VendorManageFormComponent } from './Components/vendor-manage-form/vendor-manage-form.component';
import { ShelfManagementComponent } from './Components/shelf-management/shelf-management.component';
import { ShelfListComponent } from './Components/shelf-list/shelf-list.component';
import { ShelfManageFormComponent } from './Components/shelf-manage-form/shelf-manage-form.component';
import { ShelfManageDialogComponent } from './Components/shelf-manage-dialog/shelf-manage-dialog.component';
import { ShelfDeactivateDialogComponent } from './Components/shelf-deactivate-dialog/shelf-deactivate-dialog.component';
import { BulkRequestDialogComponent } from './Components/bulk-request-dialog/bulk-request-dialog.component';
import { BulkOrderComponent } from './Components/bulk-order/bulk-order.component';
import { BulkReturnDialogComponent } from './Components/bulk-return-dialog/bulk-return-dialog.component';


@NgModule({
  declarations: [AdminComponent,
    AdminHeader,
    MainnavComponent,
    RagStatusComponent,
    ChartsComponentComponent,
    RecentEntriesComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    StoreComponent,
    ReportsComponent,
    UserManagementComponent,
    ReportsTableComponent,
    ReportsTabsComponent,
    UserManageDialogComponent,
    UserManageFormComponent,
    UserListComponent,
    DeactivateDialogComponent,
    DetailsPipe,
    StoreUpdateComponent,
    InvoiceEditorComponent,
    NotificationsComponent,
    ImageDialogComponent,
    ItemManagementComponent,
    ItemListComponent,
    ItemManageDialogComponent,
    ItemManageFormComponent,
    ItemDeactivateDialogComponent,
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeManageDialogComponent,
    EmployeeManageFormComponent,
    DeactivateDialogcomponentEmployeeComponent,
    StoreUpdateComponent,
    InvoiceEditorComponent,
    NotificationsComponent,
    ImageDialogComponent,
    VendorManagementComponent,
    VendorListComponent,
    VendorManageDialogComponent,
    VendorManageFormComponent,
    ShelfManagementComponent,
    ShelfListComponent,
    ShelfManageFormComponent,
    ShelfManageDialogComponent,
    ShelfDeactivateDialogComponent,
    BulkOrderComponent,
    BulkRequestDialogComponent,
    BulkReturnDialogComponent
  ],
  imports: [
    MaterialModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [UserManageDialogComponent, VendorManageDialogComponent, DeactivateDialogComponent, StoreUpdateComponent, ImageDialogComponent, ItemManageDialogComponent, ItemDeactivateDialogComponent, EmployeeManageDialogComponent, DeactivateDialogcomponentEmployeeComponent, BulkRequestDialogComponent, BulkReturnDialogComponent, ShelfManageDialogComponent, ShelfDeactivateDialogComponent]
})
export class AdminModule { }
