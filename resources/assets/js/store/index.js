import Vue from 'vue';
import Vuex from 'vuex';
import notes from './modules/notes';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notes
    },
    plugins
});
