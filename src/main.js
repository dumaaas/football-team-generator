import Vue from 'vue'
import App from './App.vue'

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  console.log('MALALALALAL:', err, vm, info)
}

window.onerror = function (msg, url, line, col, error) {
  console.log("TRALALALALAL", msg, url, line, col, error);
};

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')