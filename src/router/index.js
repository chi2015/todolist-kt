import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AddTodo from '@/components/AddTodo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/:page',
      name: 'Page',
      component: Main,
    },
    {
      path: '/edit/:id',
      name: 'AddTodo',
      component: AddTodo
    }
  ],
})
