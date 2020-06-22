<template>
    <div >
      <mobilMenu
      :nodes="nodes"
      :drawer="draw"
      ></mobilMenu>
    </div>
</template>

<script>
import mobilMenu from './mobilMenu.vue'
    export default {
      name:"mobilMenu",
        components: {
                        mobilMenu
                    },
        props:  [
                    'drawer',
                    'nodes',
                ],
        data() {
            return {
                    dra:false,
                    draw:false
                
            }
        },
        watch:{
          nodes(val){
            console.log(val);
          },

               drawer(val){
                  console.log(val);
                    this.dra = !this.dra
              }
        }
    }
</script>

<style lang="scss" scoped>

</style>