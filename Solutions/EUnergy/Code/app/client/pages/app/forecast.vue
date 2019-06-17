<!--https://codepen.io/apertureless/pen/zEvvWM-->

<template>
    <v-app>
        <v-container>
            <v-sheet>
                <v-layout>
                    <v-text-field
                            v-model="lng"
                            label="Longitude"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="lat"
                            label="Latitude"
                            required
                    ></v-text-field>
                </v-layout>
                <v-btn :disabled="loading" @click="parse_data(hist_prod)">
                    Clear-Sky-Prod (cached)
                </v-btn>
                <v-btn :disabled="loading" @click="get_prod_forecast()">
                    Clear-Sky-Prod
                </v-btn>
                <v-btn :disabled="loading" @click="get_weather_forecast()">
                    Real-Weather Prod
                </v-btn>
                <BarChart
                        :data_prod="data_prod"
                        :data_prod_weather="data_prod_weather"
                        :data_load="data_load"
                        :labels="labels"
                />
            </v-sheet>
        </v-container>
    </v-app>


</template>

<script>
  import BarChart from '~/components/bar-chart'
  import axios from "axios";

  var api_url_prod_forecast = 'https://api.forecast.solar/estimate/52.359/4.880/37/0/1';
  var api_url_weather_forecast = 'http://localhost:4000/weather';
  //Clouds impact
  // http://proceedings.ases.org/wp-content/uploads/2014/02/2010-112.pdf
  // https://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1448&context=theses


  axios.defaults.headers.post = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
  axios.defaults.method = 'get';
  var api_prod_forecast = axios.create({
    url: api_url_prod_forecast,
  });
  var api_weather_forecast = axios.create({
    url: api_url_weather_forecast,
  });


  export default {
    name: "forecast",

    components: {
      BarChart,
    },

    data() {
      return {
        data_prod_weather: [],
        data_prod: [],
        data_load: [],
        today: 16,
        labels: [],
        prod: {},
        hist_prod: {
          "2019-06-16 05:08:00": 0,
          "2019-06-16 05:34:00": 3,
          "2019-06-16 06:00:00": 20,
          "2019-06-16 07:00:00": 62,
          "2019-06-16 08:00:00": 159,
          "2019-06-16 09:00:00": 294,
          "2019-06-16 10:00:00": 434,
          "2019-06-16 11:00:00": 555,
          "2019-06-16 12:00:00": 644,
          "2019-06-16 13:00:00": 698,
          "2019-06-16 14:00:00": 693,
          "2019-06-16 15:00:00": 634,
          "2019-06-16 16:00:00": 531,
          "2019-06-16 17:00:00": 398,
          "2019-06-16 18:00:00": 256,
          "2019-06-16 19:00:00": 122,
          "2019-06-16 20:00:00": 46,
          "2019-06-16 21:00:00": 22,
          "2019-06-16 21:37:00": 3,
          "2019-06-16 22:14:00": 0,
          "2019-06-17 05:08:00": 0,
          "2019-06-17 05:34:00": 3,
          "2019-06-17 06:00:00": 20,
          "2019-06-17 07:00:00": 63,
          "2019-06-17 08:00:00": 166,
          "2019-06-17 09:00:00": 314,
          "2019-06-17 10:00:00": 471,
          "2019-06-17 11:00:00": 612,
          "2019-06-17 12:00:00": 712,
          "2019-06-17 13:00:00": 762,
          "2019-06-17 14:00:00": 748,
          "2019-06-17 15:00:00": 687,
          "2019-06-17 16:00:00": 572,
          "2019-06-17 17:00:00": 425,
          "2019-06-17 18:00:00": 266,
          "2019-06-17 19:00:00": 124,
          "2019-06-17 20:00:00": 45,
          "2019-06-17 21:00:00": 21,
          "2019-06-17 21:37:00": 3,
          "2019-06-17 22:14:00": 0
        },
        loading: false,
        weather_data: {},
        lat: 52.359,
        lng: 4.880

      }
    },
    methods: {
      get_weather_forecast: function () {
        this.loading = true;
        api_weather_forecast({
          url: this.api_url_weather_forecast
        })
            .then(response => {
              console.log('Fetching');
              this.data_prod_weather = [];
              this.weather_data = {};
              let data = response.data;
              for (let i = 0; i < data.hourly.data.length; i++) {
                var date = new Date(data.hourly.data[i].time * 1000);
                var hours = "0" + date.getHours();
                var day = date.getUTCDate();
                var month = date.getUTCMonth();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime = "2019-06-" + day + " " + hours.substr(-2) + ':' + '00:00';
                this.weather_data[formattedTime] = data.hourly.data[i].cloudCover;
              }
              let days = [
                '2019-06-16',
                '2019-06-17'
              ];
              for (let j = 0; j < days.length; j++) {
                let day = days[j];
                for (let i = 1; i <= 24; i++) {
                  let str = "";
                  if (i > 9) {
                    str = i.toString()
                  } else {
                    str = "0" + i.toString();
                  }
                  let key = day + " " + str + ":00:00";
                  console.log(key, this.weather_data[key], this.data_prod[i - 1]);
                  if (this.weather_data.hasOwnProperty(key)) {
                    this.data_prod_weather.push(
                        this.weather_data[key] * 0.2 +
                        this.weather_data[key] * 0.80 * this.data_prod[24 * j + i - 1]
                    );
                  } else {
                    this.data_prod_weather.push(this.data_prod[24 * j + i - 1]);
                  }
                }
                ;
              }

              // this.prod = response.data.result.watts;
              this.loading = false;
              console.log(this.weather_data);
              console.log(this.data_prod_weather);

            });
      },
      get_prod_forecast: function () {
        this.loading = true;
        api_prod_forecast(
            {url: this.api_url_prod_forecast}
        )
            .then(response => {
              console.log('Fetching');
              this.parse_data(response.data.result.watts);
              // this.prod = response.data.result.watts;
              this.loading = false;
              console.log(response.data.result.watts);

            });
      },
      parse_data: function (prod_data) {
        this.data_prod = [];
        this.data_load = [];
        this.labels = [];
        let days = [
          '2019-06-16',
          '2019-06-17'
        ];
        for (let j = 0; j < days.length; j++) {
          let day = days[j];
          for (let i = 1; i <= 24; i++) {
            let str = "";
            if (i > 9) {
              str = i.toString()
            } else {
              str = "0" + i.toString();
            }
            let key = day + " " + str + ":00:00";
            if (prod_data.hasOwnProperty(key)) {
              this.data_prod.push(prod_data[key]);
              // this.data_load.push(prod_data[key]);
              this.labels.push(day + " " + str);
            } else {
              this.data_prod.push(0);
              // this.data_load.push(0);
              this.labels.push(day + " " + str);
            }
          }
          ;
        }
        this.data_load = [
          61.699,
          59.909,
          58.463,
          57.893,
          58.668,
          60.979,
          68.258,
          73.292,
          74.571,
          74.388,
          74.538,
          74.854,
          74.541,
          73.403,
          72.81,
          71.772,
          71.377,
          72.269,
          75.238,
          75.326,
          71.008,
          67.82,
          65.951,
          62.156,
          60.652,
          59.114,
          58.04,
          57.81,
          57.864,
          60.087,
          66.962,
          72.425,
          75.401,
          75.79,
          76.02,
          75.934,
          75.53,
          73.391,
          72.382,
          71.486,
          70.423,
          71.109,
          72.822,
          72.701,
          68.622,
          65.245,
        ];
        for(let i =0;i<this.data_load.length;i++){
          this.data_load[i]=(this.data_load[i]-50)*25
        }



      }
    },
    computed: {
      api_url_prod_forecast: function () {
        return 'https://api.forecast.solar/estimate/' + this.lat + '/' + this.lng + '/37/0/1'
      },
      api_url_weather_forecast: function () {
        return 'http://localhost:4000/weather?lng=' + this.lng + '&lat=' + this.lat
      },
    }
  }
</script>

<style scoped>

</style>