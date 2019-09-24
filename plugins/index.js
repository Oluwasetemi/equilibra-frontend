import Vue from "vue";
import Vuelidate from "vuelidate";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(Element, { locale });
Vue.use(Vuelidate);

const eventBus = {};

eventBus.install = function(Vue) {
  Vue.prototype.$eventBus = new Vue();
};

Vue.use(eventBus);
