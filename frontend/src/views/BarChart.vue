<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Performance
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Total orders
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  data() {
    return {
      allData: [],
      color: 'light',
    };
  },
  async created() {
    await this.getEntries();
  },
  methods: {
    async getEntries() {
      this.$http.get('http://localhost:8081/api/entry/month')
      .then((response) => {
        this.allData = response.data.data;
        this.createGraph();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    createGraph() {
      console.log('this.allData: ', this.allData);
      let config = {
        type: 'doughnut',
        data: {
          labels: this.allData.types,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: [
                '#71717a',
                '#2563eb',
                'rgba(167, 243, 208',
                'rgba(249, 115, 22'
              ],
              borderColor:[
                '#71717a',
                '#2563eb',
                'rgba(167, 243, 208',
                'rgba(249, 115, 22'
              ],
              data: this.allData.values,
              fill: true,
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Type",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      console.log('ctx1: ', document.getElementById("bar-chart"));
      console.log('ctx2: ', document.getElementById("bar-chart").getContext("2d"));
      const ctx = document.getElementById("bar-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    },
  },
};
</script>