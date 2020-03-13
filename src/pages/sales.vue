<template>
    <div>
        <h1>Satiş sayfası</h1>
    </div>
</template>

<script>
    export default {
        props:['stokid','stokad'],
        data(){
            return{
                
               //  parentname:this.$route.params.parentname
                
            }
        },
        mounted(){
            console.log(this.stokid);
        }
    }
</script>

<style lang="scss" scoped>

</style>