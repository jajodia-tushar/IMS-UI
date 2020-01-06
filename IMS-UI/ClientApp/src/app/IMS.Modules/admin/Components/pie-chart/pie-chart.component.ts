import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/Admin/FrequentlyUsedItemModel";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { FrequentlyUsedItemService } from "src/app/IMS.Services/admin/frequently-used-item.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { DateUtils } from "src/app/IMS.Modules/shared/utils/dateutils";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  constructor(
    private randomColorGeneratorService: RandomColorGeneratorService,
    private frequentlyUsedItemService: FrequentlyUsedItemService,
    private router: Router
  ) { }

  chart: Chart;
  toDate: string;
  fromDate: string;


  async ngOnInit() {

    let currentDate: Date = new Date();
    this.toDate = DateUtils.dateFormatter(currentDate);
    currentDate.setDate(currentDate.getDate() - 6)
    this.fromDate = DateUtils.dateFormatter(currentDate);

    await this.getData().then((data) => {
      if (data.status == "Success") {
        this.createPieChart();
        this.plotDataOnChart(this.chart, data);
      }
    });
  }

  getData(): Promise<FrequentlyUsedItemModel> {
    return this.frequentlyUsedItemService.getFrequentlyUsedItemData(this.fromDate, this.toDate, "5").toPromise();
  }

  plotDataOnChart(chart: Chart, data: FrequentlyUsedItemModel) {
    chart.data = this.convertDataModel(data);
    chart.update();
  }

  convertDataModel(data: FrequentlyUsedItemModel) {
    return {
      labels: data.itemQuantityMapping.map(data => data.item.name),
      datasets: [
        {
          label: `Top ${data.itemQuantityMapping.length} items Consumed`,
          borderWidth: 0,
          borderColor: "#000",
          data: data.itemQuantityMapping.map(data => data.quantity),
          backgroundColor: this.randomColorGeneratorService.getRandomColor(data.itemQuantityMapping.length)
        }
      ]
    }
  }

  onRefresh() {
    let element = document.getElementById("refreshPie");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");
      this.getData().then((data) => {
        if (data.status == "Success") {
          this.plotDataOnChart(this.chart, data);
        }
      });
    }, 2000);

  }

  private createPieChart() {
    this.chart = new Chart("pie-chart", {
      type: "pie",
      data: {},
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }

  dateChange(event: Event) {
    let data = (<HTMLButtonElement>event.target).value;
    let currentDate: Date = new Date();
    if (data === "7") {
      currentDate.setDate(currentDate.getDate() - 6);
      this.fromDate = DateUtils.dateFormatter(currentDate);
    }
    else if (data === "14") {
      currentDate.setDate(currentDate.getDate() - 13);
      this.fromDate = DateUtils.dateFormatter(currentDate);
    }
    this.onRefresh();
  }
}
