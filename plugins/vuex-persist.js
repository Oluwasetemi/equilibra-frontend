import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
    }).plugin(store);
  });
};
