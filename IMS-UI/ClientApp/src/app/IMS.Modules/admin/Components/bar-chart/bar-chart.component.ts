import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ItemWiseAnalysisResponse } from "src/app/IMS.Models/Item/ItemWiseAnalysisResponse";
import { ItemWiseDataService } from "src/app/IMS.Services/admin/item-wise-data.service";


@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService, private itemWiseDataService: ItemWiseDataService) {

  }
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
      this.createBarChart();
      this.plotDataOnChart(this.chart, data);
    });
  }

  createBarChart() {
    this.chart = new Chart("bar-chart", {
      type: "bar",
      data: {},
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  plotDataOnChart(chart: Chart, data: ItemWiseAnalysisResponse) {
    chart.data = this.convertDataModel(data);
    chart.update();
  }

  getData(): Promise<ItemWiseAnalysisResponse> {
    // This can change according to The API of Varsha
    return this.itemWiseDataService.getItemWiseTotalData(this.fromDate, this.toDate).toPromise();
  }


  convertDataModel(itemwiseAnalysisData: ItemWiseAnalysisResponse) {
    return {
      labels: itemwiseAnalysisData.itemConsumptions.map((data, index, array) => {

        let date = new Date(Date.parse(data.date));
        if (array.length > 7) return `${date.getDate()}/${date.getMonth() + 1}`;
        else return date.toString().split(' ')[0];
      }),
      datasets: [
        {
          data: itemwiseAnalysisData.itemConsumptions.map(data => data.itemsConsumptionCount),
          backgroundColor: this.randomColorGenerator.getRandomColor(itemwiseAnalysisData.itemConsumptions.length
          )
        }
      ]
    }
  }

  onRefresh() {
    let element = document.getElementById("refreshBar");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");
      this.getData().then((data) => {
        this.plotDataOnChart(this.chart, data);
      });
    }, 2000);

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
