import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminHeader } from './Components/admin-header/admin-header.component';
import { MainnavComponent } from './Components/mainnav/mainnav.component';
import { RagStatusComponent } from './Components/rag-status/rag-status.component';
import { ChartsComponentComponent } from './Components/charts-component/charts-component.component';
import { StockstatusComponent } from './Components/stockstatus/stockstatus.component';
import { RecentEntriesComponent } from './Components/recent-entries/recent-entries.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { LineChartComponent } from './Components/line-chart/line-chart.component';
import { StoreComponent } from './Components/store/store.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { UserAddDialogComponent } from './Components/user-add-dialog/user-add-dialog.component';
import { UserAddFormComponent } from './Components/user-add-form/user-add-form.component';
import { DetailsPipe } from './Components/recent-entries/details.pipe';
import { ReportsTableComponent } from './Components/reports-table/reports-table.component';
import { ReportsTabsComponent } from './Components/reports-tabs/reports-tabs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminComponent,
    AdminHeader,
    MainnavComponent,
    RagStatusComponent,
    ChartsComponentComponent,
    StockstatusComponent,
    RecentEntriesComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    StoreComponent,
    ReportsComponent,
    UserManagementComponent,
    ReportsTableComponent,
    ReportsTabsComponent,
    UserAddDialogComponent,
    UserAddFormComponent,
    DetailsPipe
    ],
  imports: [
    MaterialModule,
      AdminRoutingModule,
      SharedModule
    ],
  entryComponents: [UserAddDialogComponent]
})
export class AdminModule { }
