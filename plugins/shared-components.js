import Vue from 'vue'

import notification from '~/components/Shared/notification'

const errorMessage = Vue.component('notification', notification)

export default ({ app }, inject) => {
    inject('notification', errorMessage.options.props);
  };