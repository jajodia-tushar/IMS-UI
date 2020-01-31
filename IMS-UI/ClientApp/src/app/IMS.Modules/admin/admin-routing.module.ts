import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AdminRouteGuardService } from 'src/app/IMS.Services/Route/admin-route-guard.service';
import { MainnavComponent } from './Components/mainnav/mainnav.component';
import { StoreComponent } from './Components/store/store.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { InvoiceEditorComponent } from './Components/invoice-editor/invoice-editor.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ItemManagementComponent } from './Components/item-management/item-management.component';
import { EmployeeManagementComponent } from './Components/employee-management/employee-management.component';
import { VendorManagementComponent } from './Components/vendor-management/vendor-management.component';
import { ShelfManagementComponent } from './Components/shelf-management/shelf-management.component';
import { BulkOrderComponent } from './Components/bulk-order/bulk-order.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminRouteGuardService], data: { allowedRoles: ["Admin", "SuperAdmin"] },
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: MainnavComponent },
      { path: 'Store', component: StoreComponent },
      { path: 'Users', component: UserManagementComponent },
      { path: 'Employee', component: EmployeeManagementComponent },
      { path: 'Reports', component: ReportsComponent },
      { path: 'Items', component: ItemManagementComponent },
      { path: 'Shelves', component: ShelfManagementComponent },
      { 
        path: 'Notifications',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: NotificationsComponent
          },
          {
            path: 'VendorOrder/:id',
            component: InvoiceEditorComponent
          },
          {
            path : 'BulkOrder/:id',
            component : BulkOrderComponent
          }
        ]
      },
      { path: 'Vendors', component: VendorManagementComponent },
      { path: 'Items', component: ItemManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
