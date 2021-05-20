import Vue from 'vue'
import App from './App.vue'
import VuePlaceAutocomplete from 'vue-place-autocomplete'

Vue.use(VuePlaceAutocomplete);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
