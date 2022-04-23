import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('./components/Home/Shouye'),
    children: [{
        path: 'Shouye',
        name: 'Shouye',
        component: () => import('./components/Home/Shouye'),
    }, ]
}, {
    path: '/ShouyePage',
    name: 'ShouyePage',
    component: () => import('./components/ShouyePage'),
    children: [{
        path: 'Shipin',
        name: 'Shipin',
        component: () => import('./components/ShouyePage/Shipin'),
    }, {
        path: 'Yuqing',
        name: 'Yuqing',
        component: () => import('./components/ShouyePage/Yuqing'),
    }, {
        path: 'Xinwen',
        name: 'Xinwen',
        component: () => import('./components/ShouyePage/Xinwen'),
    }, {
        path: 'Zoushitu',
        name: 'Zoushitu',
        component: () => import('./components/ShouyePage/Zoushitu'),
    }, {
        path: 'Shaixuanriqi',
        name: 'Shaixuanriqi',
        component: () => import('./components/ShouyePage/Shaixuanriqi'),
    }]
}, {
    path: '/Caiji',
    name: 'Caiji',
    component: () => import('./components/Caiji'),
    children: [{
        path: 'Redulianjie',
        name: 'Redulianjie',
        component: () => import('./components/Caiji/Redulianjie'),
    }, {
        path: 'Yuntureci',
        name: 'Yuntureci',
        component: () => import('./components/Caiji/Yuntureci'),
    }, {
        path: 'FabuXinwen',
        name: 'FabuXinwen',
        component: () => import('./components/Caiji/Xinwen'),
    }, ]
}, {
    path: '/Zhanghao',
    name: 'Zhanghao',
    component: () => import('./components/Zhanghao'),
    children: [{
        path: 'Quanxianguanli',
        name: 'Quanxianguanli',
        component: () => import('./components/Zhanghao/Quanxianguanli'),
    },{
        path: 'Zhanghaoguanli',
        name: 'Zhanghaoguanli',
        component: () => import('./components/Zhanghao/Zhanghaoguanli'),
    } ]
}]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router