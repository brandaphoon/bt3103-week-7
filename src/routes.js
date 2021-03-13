import content from './components/PageContent.vue'
import orders from './components/Orders.vue'
import modify from './components/Modify.vue'
import dashboard from './components/Dashboard.vue'

export default [
    { path: '/', component: content, name:"home" },
    { path: '/orders', component: orders, name:"orders"},
    { path: '/modify/:id', component: modify, name:"modify", props:true},
    { path: '/dashboard', component: dashboard, name: "dashboard"}
]