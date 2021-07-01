// 源码位置上方[1]
export const createApp = ((...args) => {
    // 使用ensureRenderer().createApp() 来创建 app 对象
    // 源码位置上方[2]
    // -> ensureRenderer方法调用了来自runtime-core的createRenderer
    // 源码位置上方[3]
    // -> createRenderer(HostNode, HostElement),两个通用参数HostNode(主机环境中的节点)和HostElement(宿主环境中的元素)，对应于宿主环境。
    // -> reateRenderer(使用（可选的）选项创建一个 Renderer 实例。),该方法返回了 baseCreateRenderer
    // 源码位置上方[4]
    // -> baseCreateRenderer方法最终返回 render hydrate createApp三个函数，生成的 render 传给 createAppAPI ，hydrate 为可选参数，ssr 的场景下会用到；
  const app = ensureRenderer().createApp(...args)

  if (__DEV__) {
     // DEV环境下，用于组件名称验证是否是原生标签或者svg属性标签
    injectNativeTagCheck(app)
     // DEV环境下，检查CompilerOptions如果有已弃用的属性，显示警告
    injectCompilerOptionsCheck(app)
  }

  const { mount } = app
  // 从创建的app对象中解构获取mount，改写mount方法后 返回app实例
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // container 是真实的 DOM 元素,normalizeContainer方法使用document.querySelector处理传入的<containerOrSelector>参数，如果在DEV环境下元素不存在 或者 元素为影子DOM并且mode状态为closed，则返回相应的警告 
    const container = normalizeContainer(containerOrSelector)
    // 如果不是真实的DOM元素则 return
    if (!container) return
	
     // 这里的app._component 其实就是全局API的createApp的第一个参数，源码位置在上方[5]
    const component = app._component
    // component不是函数 并且 没有不包含render、template
    if (!isFunction(component) && !component.render && !component.template) {
      // 不安全的情况
      // 原因:可能在dom模板中执行JS表达式。
      // 用户必须确保内dom模板是可信的。如果它是
      // 模板不应该包含任何用户数据。
        
       //  使用 DOM的innerHTML作为component.template 内容
      component.template = container.innerHTML
      // 2.挂载前检查，获得元素属性的集合遍历如果name不是v-cloak状态 并且属性名称包含v-、:、@ ，会给出vue文档链接提示
      if (__COMPAT__ && __DEV__) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i]
          if (attr.name !== 'v-cloak' && /^(v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
              null
            )
            break
          }
        }
      }
    }

    // 挂载前清除内容
    container.innerHTML = ''
    // 真正的挂载 （元素， 是否复用[此处个人理解，仅供参考]，是否为SVG元素）
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      // 删除元素上的 v-cloak 指令
      container.removeAttribute('v-cloak')
      // 设置data-v-app属性
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
}) as CreateAppFunction<Element>

