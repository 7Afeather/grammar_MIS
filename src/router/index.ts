import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
// 导入存储需要访问权限的 path 数组模块
// import pathArr from '@/router/pathArr.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 注意：hash 地址不要写大写字母
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect:'/home/welcome',
      // 默认打开页面后直接显示 users 用户管理界面
      // redirect: '/home/users',
      // 在 children 属性中的组件表示将要在 Home 组件中的 router-view 占位标签中渲染
      // children 中的 path 不要 /
      children: [
        {path:'welcome',component: () => import('../views/welcome/Welcome.vue')},
        {path:'misdesc',component: () => import('../views/misdesc/MisDesc.vue')},
        {path:'userinfo/infocollect',component: () => import('../views/userinfo/InfoCollect.vue')},
        {path:'userinfo/infoanalyse',component: () => import('../views/userinfo/InfoAnalyse.vue')},
        {path:'power/manager',component: () => import('../views/power/Manager.vue')},
        {path:'power/employer',component: () => import('../views/power/Employer.vue')},
        {path:'vipmanage',component: () => import('../views/vip/VipManage.vue')},
        {path:'grammar/analyse/senior',component: () => import('../views/grammar/analyse/Senior.vue')},
        {path:'grammar/analyse/junior',component: () => import('../views/grammar/analyse/Junior.vue')},
        {path:'grammar/analyse/primary',component: () => import('../views/grammar/analyse/Primary.vue')},
        {path:'grammar/content/senior',component: () => import('../views/grammar/content/Senior.vue')},
        {path:'grammar/content/junior',component: () => import('../views/grammar/content/Junior.vue')},
        {path:'grammar/content/primary',component: () => import('../views/grammar/content/Primary.vue')},
        {path:'bookmanage',component: () => import('../views/books/BookManage.vue')},
        {path:'recommendmanage',component: () => import('../views/recommends/RecommendManage.vue')},
        {path:'examcollect',component: () => import('../views/exams/ExamCollect.vue')},
        {path:'examanalyse',component: () => import('../views/exams/ExamAnalyse.vue')},
        {path:'theme',component: () => import('../views/theme/Theme.vue')},
        {path:'settings',component: () => import('../views/settings/Settings.vue')},
        {path:'message',component: () => import('../views/message/Message.vue')},
        {path:'my',component: () => import('../views/my/My.vue')},
      ]
    }
  ]
})

// // 定义全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 控制页面访问权限
//   // const pathArr = ['/home', '/home/users', '/home/rights']
//   // 只要 indexOf 函数返回 -1，就证明在 pathArr 数组中找不到 to.path，说明该 to.path 可以放行
//   if (pathArr.indexOf(to.path) !== -1) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
export default router
