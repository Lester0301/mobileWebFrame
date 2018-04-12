<template>
  <div id="homeHeader">
    <div class="headerTop">
      <i class="iconfont" id="catalogueBtn" @click="setLeftLoginShow(true)">&#xe60e;</i>
      <div class="homeName">HEADER</div>
    </div>
    <div class="headerBottom">
      <SearchPanel></SearchPanel>
    </div>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { Button } from 'mint-ui'
  import SearchPanel from '@/components/common/search-panel.vue';

  // import 'mint-ui/lib/style.css'
    export default {
        name: "homeHeader",
        data(){
          return {
            value:'',
            result:['1','2','3','4']
          }
        },
        components:{
          SearchPanel
        },
        methods:{
          ...mapMutations({
            setLeftLoginShow: 'SET_Left_Login_Show'
          }),
        }
    }

</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../assets/styles/common.scss";
  @import "../../assets/iconfont/iconfont.css";


  #homeHeader{
    position:fixed;
    top:0;
    left:0;
    // height: 100rem;
    width: 100%;
    z-index:11;
    .headerTop{
      height:0.45rem;
      background-color:$defBckgCol;
      color:$defFontCol;
      #catalogueBtn{
        position: absolute;
        left:0.1rem;
        font-size:$s5 !important;
        line-height: 0.45rem;
      }
      .homeName{
        font-size:$s4 !important;
        line-height: 0.45rem;
      }
    }
    .headerBottom{
      height:0.42rem;
      background-color: #eeeeee;
    }

  }
</style>
