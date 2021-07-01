import { createApp } from 'vue'
import App from './App.vue'
// import Main from './Main.vue'
import '../public/index.css'
import { valueToNode } from '@babel/types'

const app = createApp(App)
/**
 * 此方法为自定义指令节流 
 * 
在3.0中指令的注册和其生命周期是这样的
import { createApp } from 'vue'
const app = createApp({})
// 注册
app.directive('my-directive', {
  // Directive has a set of lifecycle hooks:
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {},
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {}
})
 */

app.directive('focus',{
    mounted(el){
        console.log("聚焦：",el)
        el.focus()
    }
})

app.mount('#app')