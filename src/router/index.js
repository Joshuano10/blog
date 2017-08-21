import Vue from 'vue';
import Router from 'vue-router';
import admin from '../components/admin/admin.vue';
import login from '../components/admin/login/login.vue';
import adminArticle from '../components/admin/adminArticle/adminArticle.vue';
import adminCategory from '../components/admin/adminCategory/adminCategory.vue';
import adminWork from '../components/admin/adminWork/adminWork.vue';
import index from '../components/index/index.vue';
import article from '../components/article/article.vue';
import articleDetail from '../components/article/articleDetail.vue';
import works from '../components/works/works.vue';
import about from '../components/about/about.vue';
import store from '../vuex/store.js';
import {isEmptyObject} from '../util/isEmpty.js';

Vue.use(Router);

export default new Router({
    mode: 'history',
    // hashbang: false,
    // history: true,
    // saveScrollPosition: true,
    linkActiveClass: 'act',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/article',
            component: article
        },
        {
            path: '/view',
            component: articleDetail
        },
        {
            path: '/works',
            component: works
        },
        {
            path: '/admin',
            component: admin,
            meta: {requireAuth: true},
            children: [
            // {
            //     path: 'login',
            //     component: login,
            //     beforeEnter: (to, from, next) => {
            //         if (!isEmptyObject(store.state.user)) {
            //             next({
            //                 path: '/admin',
            //                 query: {redirect: to.fullPath}
            //             });
            //         } else {
            //             next();
            //         }
            //     }
            // },
            {
                path: '',
                redirect: 'article'
            },
            {
                path: 'article',
                component: adminArticle,
                meta: {requireAuth: true}
            },
            {
               path: 'category',
               component: adminCategory,
               meta: {requireAuth: true}
            },
            {
               path: 'work',
               component: adminWork,
               meta: {requireAuth: true}
           }]
        },
        {
            path: '/login',
            component: login,
            beforeEnter: (to, from, next) => {
                if (!isEmptyObject(store.state.user)) {
                    next({
                        path: '/admin',
                        query: {redirect: to.fullPath}
                    });
                } else {
                    next();
                }
            }
        },
        {
            path: '/about',
            component: about
        }
    ]
});
