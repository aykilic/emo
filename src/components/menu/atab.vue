<template lang="html">
  <div class='tab' v-show='isActive'>
    <slot ></slot>
    
  </div>
</template>

<script>
export default {
  props: 
    {
      title:{ required: true },
      titleid:""
    },
  
  data () {
    return {
      isActive: true
    }
  }
}
</script>

<style lang="css">
  
</style>