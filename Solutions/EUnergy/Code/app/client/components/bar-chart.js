import VueChartJs from 'vue-chartjs'

var options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      gridLines: {
        display: true
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

export default {
  extends: VueChartJs.Line,
  props: ['data_prod', 'data_load', 'options', 'labels', 'data_prod_weather'],
  mounted() {
    this.draw_chart();
  },
  data() {
    return {

    }
  },
  methods: {
    draw_chart: function () {
      this.renderChart({
            labels: this.labels,
            datasets: [
              {
                label: 'Clear Sky Prod',
                backgroundColor: 'rgba(231, 0, 255, 0)',
                borderColor: '#fc6f77',
                data: this.data_prod
              },
                {
                label: 'Real Weather Prod',
                backgroundColor: 'rgba(0, 231, 255, 0)',
                borderColor: '#4fd0fc',
                data: this.data_prod_weather
              },
              {
                label: 'Load',
                backgroundColor: 'rgba(0, 231, 255, 0)',
                borderColor: '#000000',
                data: this.data_load
              },

            ]
          }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              elements: {line: {fill: false}},
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },

                gridLines: {
                  display: true
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            },
          }
      )
    }
  },
  watch: {
    data_prod: function () {
      this.draw_chart();
    },
    data_prod_weather: function () {
      this.draw_chart();
    },
    data_load: function () {
      this.draw_chart();
    },
  }
}
