import Home from '@/views/Home/home-view.vue'
export const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      }
    ]
  }
]
