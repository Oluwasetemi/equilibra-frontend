import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

export default ({ store }) => {
	if(!process.server){
		 window.onNuxtReady(() => {
		    new VuexPersistence({
		      /* your options */
		    }).plugin(store);
		  });
	}
};
