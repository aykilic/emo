<template >
  <div class=''>
    <ul class=' tabs__header '>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @mouseover='selectTab(index)'
        :class='{"tab__selected": (index == selectedIndex)}'
        @click="open(tab.title,tab.titleid)"
        >
        {{ tab.title }} 
      </li>
            
    
    </ul>
    <slot></slot>
  </div>
</template>
<script>
import Vue  from 'vue'
import {mapState} from 'vuex'
import {mapGetters } from 'vuex'
export default {
  
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  },
//   created() {
//         this.$router.options.routes.forEach(route => {
//             this.tabs.push({
//                 name: route.name
//                 , path: route.path
//             })
//         })
//     },
  data () {
    return {
      selectedIndex: 0, // the index of the selected tab,
    //   tabs: []         // all of the tabs
      tabs: []
    }
  },
  created () {
              
        
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    },
    open(a,b){
      //  console.log("b");
        
        // this.$router.push({ path: `/products/${b}` })
        // this.$store.dispatch('stoklistid', b)
        // const path = `/${a}`
        // if (this.$route.path !== path) this.$router.push(path)
        //  this.$router.push({ path:'/'+a })
        this.$emit('menu',false);
        this.$router.push({ name: 'stoklist', params: { parentname: a, parentid : b }})
        
        // window.location = '/'+a;
    }
  }
}
</script>

<style lang="css">

  ul.tabs__header {
    float:left;
    list-style: none;
    /* margin: 0 0 0 0; */
    margin-top:0px;
    
    padding: 0px;
    width:20%;
    height:420px;
    border-right: 5px solid rgb(240,240,240);
    
  }

  ul.tabs__header > li {
    padding: 8px 0px;
    
    display:block;
    /* margin-right: 5px; */
    cursor: pointer;
    /* border-right: 5px solid rgb(240,240,240) ;  */
    width:100%;
    
  }

  ul.tabs__header > li.tab__selected {
    font-weight: bold;
    display: inline-block;
    background:rgb(240,240,240); text-decoration: underline;
    
    
  }

  .tab {
    float:left;
    color: black;
    padding: 10px;
    width:80%;
    /* border-radius: 10px; */
    /* min-height: 40px; */
    
  }
li:hover { cursor:pointer; background:rgb(240,240,240); text-decoration: underline; }
  /* .tabs__light .tab{
    background-color: #fff;
  }

  .tabs__light li {
    background-color: #ddd;
    color: #aaa;
  }

  .tabs__light li.tab__selected {
    background-color: #fff;
    color: #83FFB3;
  } */


</style>