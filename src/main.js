// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store.js';
import './assets/css/common.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import {isEmptyObject} from './util/isEmpty.js';

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (!isEmptyObject(store.state.user)) {
            next();
        } else {
            if (window.sessionStorage.user) {
                store.state.user = JSON.parse(window.sessionStorage.user);
                console.log(store.state.user.username);
                next();
            } else {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                });
            }
        }
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     if (to.path === '/admin/login') {
//         console.log(store.state.user);
//         if (!isEmptyObject(store.state.user)) {
//             next({
//                 path: '/admin',
//                 query: {redirect: to.fullPath}
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
