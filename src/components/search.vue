<template>
    <div>
        <q-input rounded outlined dense v-model="search" class="main_search" placeholder="Kategori yada Ürün Ara" >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
          </q-input>
    </div>
</template>

<script>
import {mapGetters } from 'vuex'
    export default {
        props:['list'],
        data() {
            return {
                search:"",
            }
        },
        watch: {
            
        },
        computed: {
    
            ...mapGetters([
            'anakategorilists',
            
            
            ])
        },
         async created () {
            
        },
        async mounted () {
            // console.log("this.anakategorilists", this.anakategorilists);
            
            
        },
        methods: {
            name() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>