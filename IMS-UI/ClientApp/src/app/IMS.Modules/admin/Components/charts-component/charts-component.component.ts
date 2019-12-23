import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemService } from "src/app/IMS.Services/admin/frequently-used-item.service";
import { ItemWiseDataService } from "src/app/IMS.Services/admin/item-wise-data.service";
import { ShelfWiseDataService } from "src/app/IMS.Services/admin/shelf-wise-data.service";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/Admin/FrequentlyUsedItemModel";
import { ShelfWiseOrderCountResponse } from "src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse";
import { ItemWiseAnalysisResponse } from "src/app/IMS.Models/Item/ItemWiseAnalysisResponse";

@Component({
  selector: "app-charts-component",
  templateUrl: "./charts-component.component.html",
  styleUrls: ["./charts-component.component.css"]
})
export class ChartsComponentComponent implements OnInit {

  constructor(
    private frequentlyUsedItemService: FrequentlyUsedItemService,
    private itemWiseDataService: ItemWiseDataService,
    private shelfWiseDataService: ShelfWiseDataService
  ) {
    Chart.defaults.global.defaultFontColor = "#fff";
  }

  topItemConsumed: FrequentlyUsedItemModel;
  totalConsumedItem: ItemWiseAnalysisResponse;
  totalFloorWisedItem: ShelfWiseOrderCountResponse;

  ngOnInit() {
    this.frequentlyUsedItemService.getFrequentlyUsedItemData("20191210","20191213","5").subscribe(
      data => {
        this.topItemConsumed = JSON.parse(JSON.stringify(data));
      }
    );

    // This can change according to The API of Varsha
    this.itemWiseDataService.getItemWiseTotalData("20191210", "20191219").subscribe(
      data => {
        this.totalConsumedItem = JSON.parse(JSON.stringify(data));
        console.log(this.totalConsumedItem);
      }
    );

    this.shelfWiseDataService.getShelfWiseData("20191210", "20191219").subscribe(
      data => {
        this.totalFloorWisedItem = JSON.parse(JSON.stringify(data));
      }
    );
    
  }
}
