Vue.component('v-carousel',{
  template: `<div id="box">
  <div class="left" id="left" ref="left" @click="handleLeft">
    <div></div>
  </div>
  <div class="right" id="right" ref="right" @click="handleRight">
    <div></div>
  </div>
  <div class="point-box" id="point-box" ref="point-box"></div>
  <div id="content" ref="content"></div>
</div>`,
  props: {
    data: {
      type: Array,
    }
  },
  computed: {
    length() {
      return this.data.length
    },
  },
  data() {
    return {
      current: 0,
      nextPic: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化各种结构
      this.$refs['left'].style.zIndex = this.length
      this.$refs['right'].style.zIndex = this.length
      this.$refs['point-box'].style.zIndex = this.length

      this.$refs['content'].style.width = `${400 * this.length}px`
      for (let i = 0; i < this.length; i++) {
        const e = document.createElement('div')
        const p = document.createElement('div')

        if (i === 0) {
          p.style.backgroundColor = '#000'
        }
        p.className = `point`
        p.addEventListener('mouseover', () => {
          this.clearTimeout(this.nextPic)
          this.checkPoint(i)
        })
        
        e.style.zIndex = i
        this.$refs['content'].appendChild(e)
        this.$refs['point-box'].appendChild(p)
      }

      // 结构好了就开始启动，自动切换下一张
      this.nextPic = setTimeout(this.rightPic, 3000)
      // 绑定悬停判定
      this.startAndStop(this.$refs['content'])
      this.startAndStop(this.$refs['point-box'])
    },
    // 移动的逻辑
    transformPic(current,pre) {
      console.log('aa',current)
      document.getElementsByClassName(`point`)[pre].style.backgroundColor = '#fff'
      this.$refs['content'].style.transform = `translateX(-${current * 400}px)`
      document.getElementsByClassName(`point`)[current].style.backgroundColor = '#000'
      this.nextPic = setTimeout(this.rightPic, 3000)
    },
    // 左移方法
    leftPic() {
      let pre = this.current
      this.current = this.current > 0 ? this.current - 1 : this.length - 1
      this.transformPic(this.current,pre)
    },
    // 右移方法
    rightPic() {
      let pre = this.current
      this.current = this.current < this.length - 1 ? this.current + 1 : 0
      this.transformPic(this.current,pre)
    },
    // 左按钮操作
    handleLeft() {
      clearTimeout(this.nextPic)
      this.leftPic()
    },
    // 右按钮操作
    handleRight() {
      clearTimeout(this.nextPic)
      this.rightPic()
    },
    // 悬停逻辑
    startAndStop(e) {
      e.addEventListener('mouseover', () => {
        // 鼠标在其上，停止自动切换
        clearTimeout(this.nextPic)
      })
      e.addEventListener('mouseout', () => {
        // 鼠标离开，开启自动跳转
        this.nextPic = setTimeout(this.rightPic, 3000)
      })
    },
    // 点的高亮
    checkPoint(i) {
      for (let p = 0; p< length; p++) {
        document.getElementsByClassName(`point`)[p].style.backgroundColor = '#fff'
      }
      current = i
      content.style.transform = `translateX(-${this.current * 400}px)`
      document.getElementsByClassName(`point`)[this.current].style.backgroundColor = '#000'
    }
  }
})