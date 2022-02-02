import Vue from 'vue'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

import VueMeteorTracker from 'vue-meteor-tracker';

Vue.use(VueMeteorTracker);

Meteor.startup(() => {

  console.log("Aplicación arrancada")
  new Vue({
    el: '#app',
    ...App,
  })
})
