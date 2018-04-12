<template>
  <div id="homeCarousel">
    <mt-swipe :auto="4000">
      <mt-swipe-item style="background-color: greenyellow">1</mt-swipe-item>
      <mt-swipe-item style="background-color: rebeccapurple">2</mt-swipe-item>
      <mt-swipe-item style="background-color: brown">3</mt-swipe-item>
    </mt-swipe>


  </div>

</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  

    export default {
      name: "home-carousel",
      components:{
        MtSwipe:Swipe,
        MtSwipeItem:SwipeItem
      },

    }
</script>

<style lang="scss" scoped="" type="text/css">

  #homeCarousel{
    width:100%;
    height: 0.8rem;

  }


</style>
