import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
    path: '/Login',
    name: 'Login',
    component: () => import('./components/Login/index.vue'),
},{
    path: '/',
    name: 'Home',
    component: () => import('./components/Home/Shouye'),
    children: [{
        path: 'Shouye',
        name: 'Shouye',
        component: () => import('./components/Home/Shouye'),
    }, ]
},{
    path: '/',
    name: 'Home_u',
    component: () => import('./components/Home_u/Shouye'),
    children: [{
        path: 'Shouye_u',
        name: 'Shouye_u',
        component: () => import('./components/Home_u/Shouye'),
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
},{
    path: '/ShouyePage_u',
    name: 'ShouyePage_u',
    component: () => import('./components/ShouyePage_u'),
    children: [{
        path: 'Shipin_u',
        name: 'Shipin_u',
        component: () => import('./components/ShouyePage_u/Shipin'),
    }, {
        path: 'Yuqing_u',
        name: 'Yuqing_u',
        component: () => import('./components/ShouyePage_u/Yuqing'),
    }, {
        path: 'Xinwen_u',
        name: 'Xinwen_u',
        component: () => import('./components/ShouyePage_u/Xinwen'),
    }, {
        path: 'Zoushitu_u',
        name: 'Zoushitu_u',
        component: () => import('./components/ShouyePage_u/Zoushitu'),
    }, {
        path: 'Shaixuanriqi_u',
        name: 'Shaixuanriqi_u',
        component: () => import('./components/ShouyePage_u/Shaixuanriqi'),
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
    },{
        path: 'Guanjiancifenxi',
        name: 'Guanjiancifenxi',
        component: () => import('./components/Caiji/Guanjiancifenxi'),
    }, ]
},{
    path: '/Caiji_u',
    name: 'Caiji_u',
    component: () => import('./components/Caiji_u'),
    children: [{
        path: 'Redulianjie_u',
        name: 'Redulianjie_u',
        component: () => import('./components/Caiji_u/Redulianjie'),
    }, {
        path: 'Yuntureci_u',
        name: 'Yuntureci_u',
        component: () => import('./components/Caiji_u/Yuntureci'),
    }, {
        path: 'FabuXinwen_u',
        name: 'FabuXinwen_u',
        component: () => import('./components/Caiji_u/Xinwen'),
    }, ]
},{
    path: '/Wenzhoujiaoyu',
    name: 'Wenzhoujiaoyu',
    component: () => import('./components/Wenzhoujiaoyu'),
    children: [{
        path: 'Fabuliebiao',
        name: 'Fabuliebiao',
        component: () => import('./components/Wenzhoujiaoyu/Fabuliebiao'),
    },{
        path: 'Fabuliebiao_s',
        name: 'Fabuliebiao_s',
        component: () => import('./components/Wenzhoujiaoyu/Fabuliebiao_s'),
    }, {
        path: 'Lishifabu',
        name: 'Lishifabu',
        component: () => import('./components/Wenzhoujiaoyu/Lishifabu'),
    }]
},{
    path: '/Wenzhoujiaoyu_u',
    name: 'Wenzhoujiaoyu_u',
    component: () => import('./components/Wenzhoujiaoyu_u'),
    children: [{
        path: 'Fabuliebiao_u',
        name: 'Fabuliebiao_u',
        component: () => import('./components/Wenzhoujiaoyu_u/Fabuliebiao'),
    }, {
        path: 'Lishifabu_u',
        name: 'Lishifabu_u',
        component: () => import('./components/Wenzhoujiaoyu_u/Lishifabu'),
    }]
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