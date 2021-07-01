/**
 * //防抖---非立即执行版：
 *触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
* */
export function debounce(fn, delay) {
    let timer   = null;
    return function () {
    let args = arguments;
    let context = this;
        if (timer) {
            clearTimeout(timer);
        }
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
}
//防抖---立即执行版：
/**
* 立即执行版的意思是触发事件后函数会立即执行，* 然后 n 秒内不触发事件才能继续执行函数的效果。
*   this:让 debounce 函数最终返回的函数 this 指向不变
 * arguments : 参数
 * */
export function Debounce2(func,wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait)
    if (callNow) func.apply(context, args)
  }
}


// 节流
/**
* 时间戳版：
* */

export function throttle(func, wait) {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

/**
 *
 * 定时器版:s
 *
 * */

export function Throttle2(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }

  }
}

