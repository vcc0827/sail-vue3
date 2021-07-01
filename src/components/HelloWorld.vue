<template>
  <!-- <h1>{{ msg }}</h1> -->
  <!-- <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
  <div>
    <span>debounce</span>
    <p>
      防抖：接收触发后，等待一个固定时间再触发事件，如果在这段时间内再次触发则重新开始计算等待时间。
    </p>
    <p>目的：对输入文字进行检测时，不会频繁触发检测事件影响用户体验。</p>
    <input type="text" v-model="debounceWord" @keyup="check" />
    <p>{{ debounceData }}</p>
  </div>
  <div>
    <span>throttle</span>
    <p>节流：多次触发事件，每段时间内只做一次响应。</p>
    <p>目的：防止因为网络延迟导致的触发接收顺序错误；</p>
    <input
      v-model="throttleWord"
      type="text"
      @keyup="check2"
    />
    <p>{{ throttleData }}</p>
  </div>
  <div>
    <span>throttle 自定义指令版</span>
    <p>2秒内只能生效一次点击</p>
    <input type="text" v-focus  />
    <p>点击次数：{{clickCount}}</p>
  </div>
</template>

<script>
import { debounce,Debounce2,throttle,Throttle2 } from "../utils/debounce";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      debounceWord: "",
      debounceData: "",
      throttleWord: "",
      throttleData: "",
      clickCount:0
    };
  },
  methods: {
    check: debounce(function () {
      this.handle("debounce");
    }, 500),
    check2: Throttle2(function(){
      this.handle("throttle")
    },2000),
    handle(flag) {
      let that = this;
      that.debounceData = null;
      that.throttleData = null;
      if (flag == "debounce") {
        if (!that.debounceData) {
          if (that.debounceWord > 777) {
            that.debounceData = "不要输入大于777的数字";
          } else {
            that.debounceData = that.debounceWord;
          }
        }
      }
      if (flag == "throttle") {
        if (!that.throttleData) {
          that.throttleData = that.throttleWord;
        }
      }
    },
    clickCheck(){
      that.clickCheck++
    }
  },
};
</script>
