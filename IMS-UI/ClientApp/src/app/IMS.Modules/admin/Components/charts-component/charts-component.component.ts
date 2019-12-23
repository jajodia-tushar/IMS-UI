import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemService } from "src/app/IMS.Services/admin/frequently-used-item.service";
import { ItemWiseDataService } from "src/app/IMS.Services/admin/item-wise-data.service";
import { ShelfWiseDataService } from "src/app/IMS.Services/admin/shelf-wise-data.service";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/FrequentlyUsedItemModel";
import { ItemWiseAnalysisModel } from "src/app/IMS.Models/Item/ItemWiseAnalysisModel";
import { ShelfWiseAnalysisModel } from "src/app/IMS.Models/Shelf/ShelfWiseAnalysisModel";

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
  totalConsumedItem: ItemWiseAnalysisModel;
  totalFloorWisedItem: ShelfWiseAnalysisModel;

  ngOnInit() {
    this.topItemConsumed = this.frequentlyUsedItemService.getFrequentlyUsedItemData();

    this.totalConsumedItem = this.itemWiseDataService.getItemWiseTotalData();

    this.totalFloorWisedItem = this.shelfWiseDataService.getShelfWiseData();
  }
}
