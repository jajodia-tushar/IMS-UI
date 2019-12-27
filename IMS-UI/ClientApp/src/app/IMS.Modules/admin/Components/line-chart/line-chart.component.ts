import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ShelfWiseOrderCountResponse } from "src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse";
import { ShelfWiseDataService } from "src/app/IMS.Services/admin/shelf-wise-data.service";
import { ChartsComponentComponent } from "../charts-component/charts-component.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService, private shelfWiseDataService: ShelfWiseDataService,
    private router: Router) { }
  chart: Chart;
  toDate: string;
  fromDate: string;


  ngOnInit() {
    let currentDate: Date = new Date();
    this.toDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;

    currentDate.setDate(currentDate.getDate() - 6);
    this.fromDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;

    this.getData().then((data) => {
      console.log(data);
      if (data.status == "Success") {
        this.createLineChart();
        this.plotDataOnChart(this.chart, data);
      }
      else if (data.error.errorCode == 401) {
        this.router.navigateByUrl("/login");
      }
    });
  }

  getData(): Promise<ShelfWiseOrderCountResponse> {
    return this.shelfWiseDataService.getShelfWiseData(this.fromDate, this.toDate).toPromise();
  }

  plotDataOnChart(chart: Chart, data: ShelfWiseOrderCountResponse) {
    let backgroundColor: string[] = this.randomColorGenerator.getRandomColor(data.dateWiseShelfOrderCount[0].shelfOrderCountMappings.length);
    chart.data = this.convertDataModel(data, backgroundColor);
    chart.options.scales.yAxes[0] = {
      scaleLabel: {
        display: true,
        labelString: 'Quantity Consumed'
      }

    };

    chart.options.scales.xAxes[0] = {
      scaleLabel: {
        display: true,
        labelString: 'Day'
      }
    };
    chart.update();
  }

  onRefresh() {
    let element = document.getElementById("refreshLine");
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

  convertDataModel(shelfwiseOrderCountData: ShelfWiseOrderCountResponse, backgroundColor: string[]) {
    return {
      labels: shelfwiseOrderCountData.dateWiseShelfOrderCount.map((data, index, array) => {
        let date = new Date(data.date);
        if (array.length > 7)
          return `${date.getDate()}`;
        else
          return date.toString().split(' ')[0];
      }),
      datasets: shelfwiseOrderCountData.dateWiseShelfOrderCount[0].shelfOrderCountMappings.map((data, index) => {
        return {
          label: data.shelfName,
          backgroundColor: backgroundColor[index],
          borderColor: backgroundColor[index],
          data: shelfwiseOrderCountData.dateWiseShelfOrderCount.map(shelfData => shelfData.shelfOrderCountMappings[index].orderCount),
          fill: false
        };
      })
    }
  }

  private createLineChart() {
    this.chart = new Chart("line-chart", {
      type: "line",
      data: {},
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
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