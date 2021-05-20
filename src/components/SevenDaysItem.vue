<template>
    <div class="item">
        <div class="item_icon"><img v-bind:src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '.png'"></div>
        <div class="item_avg_temp">{{tempInCelsius}}</div>
        <div class="item_description">{{day.weather[0].description}}</div>
        <div class="item_date">{{showDate}}</div>
    </div>
</template>

<script>
    export default {
        name: "SevenDaysItem",
        props: {
            day: {
                type: Object,
                required: true
            }
        },
        computed: {
            tempInCelsius: function () {
                return Math.round(this.day.temp.morn) + '°C'
            },
            showDate: function () {
                return new Date(this.day.dt * 1000).toDateString()
            }
        }
    }
</script>

<style scoped>
.item_date {
    font-size: 12px;
}
</style>