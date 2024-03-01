import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const {globalProperties} = app.config
globalProperties.workerAmount = ref(0)
globalProperties.machineAmount = ref(0)
globalProperties.factoryAmount = ref(0)
globalProperties.totalAmount = ref(0)
globalProperties.currentAmount = ref(0)
globalProperties.marketingLevel = ref(0)
globalProperties.moneyAmount = ref(0)
globalProperties.woodAmount = ref(250)
globalProperties.schlaegerPreis = ref(15)
app.use(router)

app.mount('#app')
export default globalProperties
