<template>
  <div id="leftLogin">
    <div class="portrait">
      <img src="@/images/favicon.png" alt="">
    </div>
    <div>立即登录</div>
    <div>登录后更好玩儿</div>
    <div>立即登录</div>
    <div>立即登录</div>

  </div>
</template>

<script>
    export default {
        name: "left-login",
        data(){
          return {
            portraitImg:'logo.png'
          }
        }
    }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../assets/styles/common.scss";

  #leftLogin{
    position: absolute;
    background-color: #E86382;
    /*box-shadow: 2px 2px 2px #aaa;*/
    z-index: 1001;
    height: 60%;
    color:$defFontCol;
    width:65%;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    padding-bottom:1rem;
    .portrait{
      background-color: gainsboro;
      height:0.8rem;
      width:0.8rem;
      display:flex;
      justify-content:center;
      align-items: center;
      border-radius: 50%;
      overflow:hidden;
      img{
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
