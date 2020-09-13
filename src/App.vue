<template>
  <div class="main-container">
    <div class="main">
      <div>
        <div>
          <img src="./assets/svgs/logo.svg" alt="" width="100" height="50">
        </div>
        <div class="title">
          <span class="name">LAMY</span>
          <span>BUTTON</span>
        </div>
        <div class="making-tip">
          {{tip}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const tips = [
  '正在筹备中，即将上线',
  '在做了',
  '绝对不鸽'
]
export default {
  name: 'App',
  data() {
    return {
      tips: tips,
      tip: ''
    }
  },
  created() {
    this.tip = this.tips[Math.round(Math.random()*this.tips.length)]
  }
}
</script>

<style lang="stylus" scoped>
.main
  &-container
    position absolute
    height 100%
    width 100%
    background-color #F6FAFE
  height 100%
  width 100%
  font-size 14px
  background url("./assets/images/bg-top.png"),url("./assets/svgs/bg-l.svg"),url("./assets/svgs/bg-r.svg")
  background-position top, bottom left, bottom right
  background-size auto,45%,45%
  background-repeat repeat-x,no-repeat,no-repeat
  display flex
  justify-content center
  align-items center
  text-align center
  .title
    font-size 34px
    color #3e9ef7
    font-weight 300
    .name
      font-weight 700
      margin-right 10px
  .making-tip
    @extend .title
    margin-top 5px


</style>
