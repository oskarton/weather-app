<template>
  <div id="app">
    <SearchLine
            v-on:set-area="setArea"
    />
    <div class="forecast__period">
      <button v-if="city" class="btn" v-bind:class="{active: current}" v-on:click="showCurrent">Current</button>
      <button v-if="city" class="btn" v-bind:class="{active: sevenDays}" v-on:click="showSevenDays">7 day forecast</button>
    </div>
    <div class="forecast__area">
      <h3 class="forecast__area__city">{{city}}</h3>
      <p class="forecast__area__country">{{country}}</p>
    </div>
    <div v-if="city" class="forecast_information">
      <div v-if="current" class="forecast_current">
        <CurrentDayItem
          v-bind:current="forecast.current"
        />
      </div>
      <div v-if="sevenDays" class="forecast_seven_days">
        <SevenDaysItem
           v-for="day in forecast.daily.slice(0,7)"
           v-bind:day="day"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchLine from '@/components/SearchLine.vue'
import CurrentDayItem from '@/components/CurrentDayItem.vue'
import SevenDaysItem from '@/components/SevenDaysItem.vue'

export default {
  name: 'App',
  props: ['forecast'],
  data() {
    return {
      key: '1a9a1940443a391d479a6c934ef4b8e3',
      city: null,
      country: null,
      forecast: null,
      current: true,
      sevenDays: false
    }
  },
  components: {
    SearchLine,
    CurrentDayItem,
    SevenDaysItem
  },
  methods: {
    setArea(field1) {
      let locationArray = field1.split(',');
      this.city = locationArray[0];
      this.country = locationArray[locationArray.length - 1];
      this.requestCityGeoParam(this.city);
    },
    requestCityGeoParam(city) {
      fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + this.key)
        .then(response => response.json())
        .then(data => this.requestForecast(data))
        .catch(function(error) {
          console.log(error);
      });
    },
    requestForecast(geoParam) {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + geoParam[0].lat + '&lon=' + geoParam[0].lon + '&units=metric&exclude=hourly,minutely,alerts&appid=' + this.key)
        .then(response => response.json())
        .then(data => (this.forecast = data))
        .catch(function(error) {
          console.log(error);
      });
    },
    showCurrent() {
      this.current = true;
      this.sevenDays = false;
    }
    ,
    showSevenDays() {
      this.sevenDays = true;
      this.current = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 80%;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input,
select,
textarea,
button:active {
  outline: none;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
.btn {
  text-transform: uppercase;
  color: lightgray;
}
.btn.active {
  color: black;
  background: lightgray;
}
.forecast__period {
  margin-bottom: 10px;
}
.forecast_seven_days {
  display: flex;
  justify-content: space-evenly;
}
input.form-control.form-control-md {
  background: url('https://www.pngfind.com/pngs/m/59-593293_search-zoom-magnifier-magnifying-glass-comments-search-icon.png');
  background-size: 2%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 99% center;
}
</style>
