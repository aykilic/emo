<template>
  <div class="denemem row" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false }
  },

  data() {
    return {
      isActive: false
    };
  },

  computed: {
    // href() {
    //     return '#' + this.name.toLowerCase().replace(/ /g, '-');
    // }
  },

  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style lang="scss" scoped>
.denemem {
  float: left;
}
</style>