<template>
  <div id="home">
    <!--头部-->
    <HomeHeader></HomeHeader>

    <!--滑入的登录信息框-->
    <transition name="leftLoginSlide-fade">
      <LeftLogin v-show="leftLoginShow"></LeftLogin>
    </transition>

    <!--登录信息框显示后的home页覆盖-->
    <transition name="homeCover-fade">
      <div id="homeCover" v-if="leftLoginShow" @click.self="leftLoginClose()"></div>
    </transition>

    <!--主内容显示区域-->
    <div id="homeMain">
      <ul
        class="infiniteScrollOuter"
        id="homeInScrlO"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div class="occupyCover"></div>
        <!--轮播图-->
        <HomeCarousel></HomeCarousel>
        <!--上拉加载主要内容区域-->
        <li v-for="item in list" class="infiniteScrollItem">{{ item }}</li>
        <div class="infiniteScrollBtm">
          <mt-spinner type="fading-circle" color="#EF0C7D"></mt-spinner>
        </div>
        <!--回到顶部-->
        <transition name="backToTop-fade">
          <i class="iconfont" id="backToTop" @click='goTop' v-show="toTop">&#xe61c;</i>
        </transition>
      </ul>
      <!--<HomeRecommend></HomeRecommend>-->
    </div>


  </div>
</template>

<script>
  import HomeHeader from '@/components/home/HomeHeader'
  import LeftLogin from '@/components/home/LeftLogin'
  import HomeCarousel from '@/components/home/HomeCarousel'

  import { Search,Button,Spinner } from 'mint-ui'
  import { mapState, mapMutations } from 'vuex'

  let timer=null;


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[0,1,2,3,4,5,6,7,8,9,10,11,12],
      toTop:false,
      stop:false
    }
  },
  mounted(){
    this.$nextTick(function () {
      let homeMainA=document.getElementById('homeMain');
      homeMainA.addEventListener('scroll', this.needToTop);  //滚动事件监听
    });
  },
  computed:{
    ...mapState([
      'leftLoginShow'
    ])
  },
  components:{
    MtButton:Button,
    MtSearch:Search,
    MtSpinner:Spinner,
    HomeHeader,
    LeftLogin,
    HomeCarousel,

    // HomeRecommend
  },
  methods: {
    //上拉加载
    loadMore() {
      let _self = this;
      this.loading = true;
      setTimeout(() => {
        let last = _self.list[_self.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          _self.list.push(last + i);
        }
        _self.loading = false;
      }, 1500);
    },
    //点击覆盖区域隐藏登录框
    leftLoginClose(){
      if(this.leftLoginShow){
        this.setLeftLoginShow(false)
      }
    },

    //回到顶部方法
    goTop(){
      clearInterval(timer);
      timer = setInterval(function() {
        let homeMainA=document.getElementById('homeMain');
        let curHeight = homeMainA.scrollTop;
        let now = curHeight;
        let speed = (0 - now) / 5;                              // 随着高度减速
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (curHeight === 0) {                          //当前高度为零,停止这次计时器
          clearInterval(timer);                             // C1
        }
        homeMainA.scrollTop = curHeight + speed;         //直接给高度赋值,会调用needtotop方法
      }, 30);

    },

    //判断是否需要显示回到顶部按钮
    needToTop(){
      let homeMainA=document.getElementById('homeMain');
      let curHeight = homeMainA.scrollTop;
      let viewHeight = homeMainA.clientHeight;
      console.log(curHeight, viewHeight)
      if (curHeight > viewHeight-600) {
        this.toTop = true;                         //赋值是为了按钮的v-show='toTop'
      }
      else
      {
        this.toTop = false;
      }
      // if(this.top){
      //   clearInterval(timer)
      // }
      // this.stop=true;
    },
    ...mapMutations({
      setLeftLoginShow: 'SET_Left_Login_Show'
    }),
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  @import "../../assets/styles/common.scss";
  @import "../../assets/iconfont/iconfont.css";

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .leftLoginSlide-fade-enter-active {
    transition: all 0.25s ease;
  }
  .leftLoginSlide-fade-leave-active {
    /*transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    transition: all 0.2s ease;
  }
  .leftLoginSlide-fade-enter, .leftLoginSlide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-6rem);
    /*opacity: 1;*/
  }

  .homeCover-enter-active, .homeCover-leave-active {
    transition: opacity 5s;
  }
  .homeCover-enter, .homeCover-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0.5;
  }

  /*回到顶部按钮显示隐藏动作*/

  .backToTop-fade-enter-active {
    transition: all .3s ease;
  }
  .backToTop-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .backToTop-fade-enter, .backToTop-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(1rem);
    opacity: 0;
  }


  #home{
    position: relative;
    height:100%;

    #homeCover{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-color: rgba(22,8,2,0.6);
      z-index: 99;
    }
    #homeMain{
      height:100%;
      display: flex;
      flex-direction: column;
      overflow: scroll;

      .infiniteScrollOuter{
        padding:0;
        margin:0;
        .occupyCover{
          height:0.87rem;
        }
        .infiniteScrollItem{
          height: 50px;
        }
        .infiniteScrollBtm{
          height:0.5rem;
          display:flex;
          justify-content: center;
          align-items: center;
          font-size:12px;
          margin-bottom: 0.2rem;
        }
        #backToTop{
          position: fixed;
          right:0.15rem;
          bottom:0.6rem;
          font-size:0.3rem;
          color:rgba(0,0,0,0.3);
        }
      }
    }
  }



</style>
