<template>
    <div style="">
              <ul style="width:15%;float:left;height:300px;border-right: 5px solid rgb(240,240,240) ;margin-bottom:10px">
                <li v-for="(tab,index) in tabs" :class="{ 'is-active': tab.isActive }" :key="index" @mouseover="selectTab(tab)">
                    <!-- <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a> -->
                    <div >{{ tab.name }} </div>
                </li>
                
              </ul>
            <div class="tabs-details" style="">
                <slot></slot>
            </div>

            
        </div>
</template>

<script>
    export default {
        data() {
        return {tabs: [] };
    },
    
    created() {
        
        this.tabs = this.$children;
        
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
    }
</script>

<style lang="scss" scoped>
li{  width: 100%; height: 3em; padding-left:5px; padding-top:10px;}
  li:hover { cursor:pointer; background:rgb(240,240,240); text-decoration: underline; }
//   li:hover section{ display: block;}  
  
//   .tabs-details{
    //   float:left;
//   }
</style>