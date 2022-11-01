const AsyncImport = path => {
  const NODE_ENV = process.env.NODE_ENV
  if (NODE_ENV === 'development') {
    return () => import(`@/views/${path}/index.vue`)
  } else {
    return async () => import(`@/views/${path}/index.vue`)
  }
}

const Home = AsyncImport('home')
const MakeDetail = AsyncImport('makeDetail')
const Stock = AsyncImport('stock')
const Transport = AsyncImport('transport')

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '制造交期预估'
    }
  },
  {
    path: '/makeDetail',
    name: 'makeDetail',
    component: MakeDetail,
    meta: {
      title: '制造交期预估详情'
    }
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock,
    meta: {
      title: '可售库存查询'
    }
  },
  {
    path: '/transport',
    name: 'transport',
    component: Transport,
    meta: {
      title: '车辆运输周期'
    }
  },
]
