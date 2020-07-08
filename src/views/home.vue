<template>
  <div class="home">
    <el-card>
      <div id="echarts" style="width: 100%;height: 500px"></div>
      <div
        class="container"
        id="echarts1"
        style="width: 100%;height: 500px"
      ></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      myEcharts: null,
      option: null,
      echarts: null,
      option1:null
    };
  },
  components: {},
  mounted() {
    this.initEcharts();
    this.drawSecondEcharts();
    this.drawFirstEcharts();
  },
  methods: {
    initEcharts() {
      this.myEcharts = this.$echarts.init(document.getElementById("echarts1"));
      this.echarts = this.$echarts.init(document.getElementById("echarts"));
    },
    drawFirstEcharts(){
     this.option1 = {
        title: {
          text: '某地区蒸发量和降水量',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['蒸发量', '降水量']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };
     this.echarts.setOption(this.option1);
    },
    drawSecondEcharts() {
      setTimeout(() => {
        this.option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2012} ({d}%)"
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012"
              }
            }
          ]
        };
        this.myEcharts.on("updateAxisPointer", event => {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            this.myEcharts.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        this.myEcharts.setOption(this.option);
      });
    }
  }
};
</script>

<style scoped></style>
