import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/Admin/FrequentlyUsedItemModel";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { FrequentlyUsedItemService } from "src/app/IMS.Services/admin/frequently-used-item.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

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


  ngOnInit() {

    let currentDate: Date = new Date();
    this.toDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;

    currentDate.setDate(currentDate.getDate() - 6);
    this.fromDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;

    this.getData().then((data) => {
      if (data.status == "Success") {
        this.createPieChart();
        this.plotDataOnChart(this.chart, data);
      }
      else if (data.error.errorCode == 401) {
        this.router.navigateByUrl("/login");
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
        else if (data.error.errorCode == 401) {
          this.router.navigateByUrl("/login");
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
      this.fromDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;
    }
    else if (data === "14") {
      currentDate.setDate(currentDate.getDate() - 13);
      this.fromDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;
    }
    this.onRefresh();
  }
}
