<template>
    <div >
        
        
    </div>
</template>

<script>
    export default {
        props: 
    {draw:{type:Boolean}},
        data() {
            return {
                drawer:false,
            }
        },
        watch:{
            draw(val){
                this.drawer = val
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>