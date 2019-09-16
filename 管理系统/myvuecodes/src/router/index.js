import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index/Home'
//引入一个路由组件时不需要.vue后缀
import Login from '@/components/login/login'
import User from '@/components/user/users'
import Right from '@/components/juri/juris';
import Role from '@/components/role/roles';

Vue.use(Router)

var route = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: User,
        },
        {
          path: '/rights',
          name: 'rights',
          component: Right
        },
        {
          path: '/roles',
          name: 'roles',
          component: Role
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})
// route.beforeEach((to, from, next) => {
//   if (to.name == 'login') {
//     next();
//   } else {
//     var token = localStorage.getItem('token');
//     if (!token) {
//       alert('请登录后查看')
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   }
// })
export default route;
