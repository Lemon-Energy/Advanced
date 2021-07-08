Vue.component('v-button',{
  template: '<button @click="handleClick">点我</button>',
  props: {
    logMessage: {
      type: String,
    }
  },
  methods: {
    handleClick() {
      console.log('传进来的消息是：', this.logMessage)
      this.$emit('is-show',)
    }
  }
})