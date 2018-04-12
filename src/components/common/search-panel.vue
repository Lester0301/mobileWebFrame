<template>
    <div id="search-panel">
        <!-- 组件不能写到template的根节点上，即每个组件只有一个根节点，这里的div就是这个template的根节点 -->
       <!--  getindex是自定义事件 -->
        <div class="search-input">
            <!-- $event是实参，表示event对象 -->
            <!--
                输入搜索内容即时搜索，所以有一个keyup事件。
                按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
                按上下键可以选择列表条目
            -->
            <input type="text" v-model="keyword" placeholder="请输入您想要搜索的关键字" @keyup="get($event)" @keydown.enter="search()" @keydown.down="selectDown()" @keydown.up.prevent="selectUp()">
            <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
            <span class="search-reset" @click="clearInput()">&times;</span>
            <button class="search-btn" @click="search()">搜索</button>

            <div class="search-select">
            <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
                <transition-group name="itemfade" tag="ul" class="ulOuter" mode="out-in" v-cloak>
                    <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @click="selectClick(index)" :key="value">
                        {{value}}
                    </li>
                    <!-- <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">
                        {{value}}
                    </li> -->
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
// import xxx from someSrc     es6中得到模块的方法。

export default {
    //注册组件
    components: {
    },
    data: function() {
        return {
            myData: [],//用来接收ajax得到的数据
            keyword: '',//v-model绑定的输入框的value
            now: -1,
            searchIndex: 0,
            logoData: [
            {
                name: '360搜索',
                searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
            }, {
                name: '百度搜索',
                searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
            }, {
                name: '搜狗搜索',
                searchSrc: 'https://www.sogou.com/web?query='
            }
            ]
        }
    },
    methods: {
        // &event是实参，表示event对象
        get: function(ev) {
          let _self = this;
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
              _self.$jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                _self.myData = res.s;
            });
        },
        selectDown: function() {
            this.now++;
            //到达最后一个时，再按下就回到第一个
            if (this.now == this.myData.length) {
                this.now = 0;
            }
            this.keyword = this.myData[this.now];
        },
        selectUp: function() {
            this.now--;
            //同上
            if (this.now == -1) {
                this.now = this.myData.length - 1;
            }
            this.keyword = this.myData[this.now];
        },
        search: function() {
            //打开对应的搜索界面
            window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
        },

        // selectHover: function(index) {
        //     this.now = index
        // },
        selectClick: function(index) {
            this.keyword = this.myData[index];
            this.search();
        },
        clearInput: function() {
          let _self=this
            this.keyword = '';
              this.$jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
                _self.myData = res.s;

            });
        },
        getIndex: function(index) {
            this.searchIndex = index;
        }
    }
}
</script>

<style type="text/css">
#search-panel{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-input {
    position: relative;
    width: 100%;
    height: 75%;
    display: flex;
    padding-left:5px;
    padding-right:5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input input {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    flex:1;
    height: 30px;
    font-size: 14px;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    margin-right:5px;
    outline:none;
    border-radius: 5px;
    /* border-radius: 5px; */
}
.search-input input:focus{
  border:1px solid #EF0C7D;
  border-radius: 5px;
}

.search-btn {
    height: 28px;
    width: 55px;
    line-height: 26px;
    border: 1px solid #F0067E;
    background-color: #F0067E;
    color: white;
    font-size: 14px;
    font-weight: 600;
    border-radius: 5px;
    outline:none;
}
.search-btn:focus{

}

.search-btn {
    cursor: pointer
}

.search-select {
    position: absolute;
    top: 100%;
    box-sizing: border-box;
    z-index: 999;
    left:5px;
    right:65px;
    /* padding-right:65px; */
}

.search-select .ulOuter{
  padding:0;
  border-radius: 5px;
  width: 100% !important;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #d4d4d4; */
}

.search-select li {

    border-top: none;
    border-bottom: none;
    /* background-color: #fff; */
    /* width: 3.5rem; */
    width:100% !important;
    background-color: white;
    border-left:1px solid #d4d4d4;
    border-right:1px solid #d4d4d4;
}
.search-select li:last-child{
  border-bottom:1px solid #d4d4d4;
}
.search-select li:first-child{
  border-top:1px solid #d4d4d4;
}

.search-select-option {
    box-sizing: border-box;
    /* width: 100%; */
    padding: 7px 10px;
}


input::-ms-clear {
    display: none
}

.search-reset {
    width: 20px;
    height: 20px;
    margin-top:-10px;
    position: absolute;
    display: block;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    right: 70px;
    top: 50%;

}

.search-select-list {
    transition: all .3s;
}

.itemfade-enter,
.itemfade-leave-active {
    opacity: 0;
}

.itemfade-leave-active {
    position: absolute;
}

.selectback {
    background-color: #eee !important;
    cursor: pointer
}
.search-select ul{margin:0;text-align: left; }
</style>
