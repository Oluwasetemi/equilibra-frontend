import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

export default ({ store }) => {
		    new VuexPersistence({
		      /* your options */
		    }).plugin(store);
};
