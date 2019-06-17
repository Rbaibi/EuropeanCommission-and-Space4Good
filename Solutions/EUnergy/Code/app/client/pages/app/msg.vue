<template>
    <!--v-for="(val,key) in props.item"-->
    <v-sheet>
        <v-layout wrap align-center>
            <v-flex xs12 sm6 d-flex>
                <v-select
                        v-model="selected"
                        :items="social_groups"
                        label="Social Groups"
                ></v-select>
                <h2>{{messages[selected]}}</h2>
            </v-flex>
            <v-flex>
                <v-btn @click="send_msg" :disabled="loading">
                    send the messages
                </v-btn>
            </v-flex>
        </v-layout>
    </v-sheet>

</template>

<script>
  import axios from "axios";

  var api_url_telegram = 'http://localhost:4000?msg=';
  //Clouds impact
  // http://proceedings.ases.org/wp-content/uploads/2014/02/2010-112.pdf
  // https://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1448&context=theses


  axios.defaults.headers.post = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
  axios.defaults.method = 'get';
  var api_msg = axios.create({
    url: api_url_telegram,
  });
  export default {
    name: "assets",
    data() {
      return {
        messages: {
          'young, single': 'Today 10:00-12:00 you get FREE energy. A good time to take a shower 🚿!',
          'mid-age, family': 'Today 10:00-12:00 you get FREE energy. Maybe start cooking earlier 👩‍🍳?',

        },
        headers: [],
        selected: "",
        loading: false,
        social_groups: [
          'young, single',
          'mid-age, family'
        ]
      }
    },
    methods: {
      send_msg: function () {
        this.loading = true;
        api_msg(
            {url: this.api_url_telegram}
        )
            .then(response => {
              console.log('Fetching');
              // this.prod = response.data.result.watts;
              this.loading = false;

            });
      }
    },
    computed: {
      api_url_telegram: function () {
        return 'http://localhost:4000?msg=' + this.messages[this.selected]
      },
    }

  }
</script>

<style scoped>

</style>