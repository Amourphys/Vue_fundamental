import { createApp } from 'vue'
import App from './App'
import components from '@/Components/UI'
import router from '@/Router/router'
import Directives from '@/Directives'
import store from './store/index'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

Directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app')
