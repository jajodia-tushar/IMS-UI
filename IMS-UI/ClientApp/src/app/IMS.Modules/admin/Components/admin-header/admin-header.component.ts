import { Component, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { CentralizedDataService } from "src/app/IMS.Services/shared/centralized-data.service";
import { User } from "src/app/IMS.Models/User/User";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.css"]
})
export class AdminHeader implements OnDestroy {
  mobileQuery: MediaQueryList;
  tabs = ["Dashboard", "Store", "Users", "Reports"];

  fillerNav = Array.from({ length: 4 }, (_, i) => `${this.tabs[i]}`);

  isVisible = false;
  isPersonVisible = false;

  changeNotificationIcon() {
    this.isVisible = !this.isVisible;
  }

  changePersonIcon() {
    this.isPersonVisible = !this.isPersonVisible;
  }


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private centralizedRepo: CentralizedDataService) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
