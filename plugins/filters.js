import Vue from 'vue';

// const capitalizeFirstLetter = val => val.charAt(0).toUpperCase() + val.substring(1)
// Vue.filter ('capitalizeFirstLetter', capitalizeFirstLetter)

// import Vue from 'vue';

// const capitalizeFirstLetter = val => {
  
// };

Vue.filter('capitalizeFirstLetter', function(val){
    return val.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.substring(1);
      }).join(' ');
});
