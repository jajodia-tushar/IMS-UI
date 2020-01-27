import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { CentralizedDataService } from "src/app/IMS.Services/shared/centralized-data.service";
import { User } from "src/app/IMS.Models/User/User";
import { chainedInstruction } from "@angular/compiler/src/render3/view/util";
import { elementAt } from "rxjs/operators";
import { LoginService } from "src/app/IMS.Services/login/login.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "src/app/IMS.Modules/shared/snackbar/snackbar.component";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.css"]
})
export class AdminHeader implements OnDestroy, OnInit {

  mobileQuery: MediaQueryList;


  navBarItems = [{
    tab: "Dashboard",
    icon: "dashboard",
    color: "#01d28e"
  }, {
    tab: "Store",
    icon: "store_mall_directory",
    color: "#ff7315"
  },
  {
    tab: "Users",
    icon: "person_pin",
    color: "#46b5d1",

  },

  {
    tab: "Employee",
    icon: "person",
    color: "#faf5e4",

  },
  {
    tab: "Items",
    icon: "local_grocery_store",
    color: "#a278b5"

  },
  {
    tab: "Reports",
    icon: "bar_chart",
    color: "#ffd800"

  },
  {
    tab: "Notifications",
    icon: "notifications_active",
    color: "#ff1111"
  }]

  async ngOnInit() {
    await this.centralizedRepo.getLoggedInUser();
    this.name = this.centralizedRepo.getUser().firstname + " " +
      this.centralizedRepo.getUser().lastname;
  }
  isVisible = false;
  isPersonVisible = false;
  selectedIndexs: any;

  name: string;

  changeNotificationIcon() {
    this.isVisible = !this.isVisible;
  }

  changePersonIcon() {
    this.isPersonVisible = !this.isPersonVisible;
  }


  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private centralizedRepo: CentralizedDataService, private loginService: LoginService,
    private router: Router, private snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia("(max-width: 400px)");
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  logout() {
    this.loginService.logOut().subscribe(
      data => {
        if (data.status == "Success") {
          this.router.navigateByUrl("/login");
        }
        else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000 * 2, data: { message: "Something Went Wrong" }
          });
        }
      }
    )
  }
}
