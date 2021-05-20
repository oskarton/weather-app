<template>
    <div class="item">
        <div class="item_icon"><img v-bind:src="'http://openweathermap.org/img/wn/' + current.weather[0].icon + '.png'"></div>
        <div class="item_temp">{{tempInCelsius}}</div>
        <div class="item_description">{{current.weather[0].main}}</div>
    </div>
</template>

<script>
export default {
    name: "CurrentDayItem",
    props: {
        current: {
            type: Object,
            required: true
        }
    },
    computed: {
        tempInCelsius: function () {
            return Math.round(this.current.temp) + '°C'
        }
    }
}
</script>

<style scoped>

</style>