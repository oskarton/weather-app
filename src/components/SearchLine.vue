<template>
    <div class="city-search">
        <place-autocomplete-field
                v-model="field1"
                v-on:autocomplete-select="$emit('set-area', field1)"
                placeholder="Enter location"
                name="field1"
                api-key="AIzaSyBwCks4Mr6OrejydbHa6exQeTEv2SMP_2k">
        </place-autocomplete-field>
    </div>
</template>

<script>
export default {
    name: 'SearchLine',
    data() {
        return {
            field1: null
        };
    }
}
</script>

<style lang="scss">
    @import 'bootstrap/scss/bootstrap.scss';
</style>