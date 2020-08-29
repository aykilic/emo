<template>
    <div>
        <!-- <q-input rounded outlined dense v-model="search" class="main_search" placeholder="Kategori yada Ürün Ara"
        clearable
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFnAutoselect"
        option-value="_id"
        option-label="stokturad"
         >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-input> -->
        <q-select
        
            v-model="search"
            clearable
            use-input
            fill-input
            input-debounce="0"
            label="Kategori yada Ürün Ara"
            :options="options"
            @filter="filterFnAutoselect"
            @filter-abort="abortFilterFn"
            option-value="_id"
            option-label="stokturad"
            class="main_search"
            hide-dropdown-icon


            rounded outlined dense
            >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                        Bulunamadı
                    </q-item-section>
                </q-item>
                </template>
            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-select>
    </div>
</template>

<script>
import {mapGetters } from 'vuex'
    export default {
        props:['list'],
        data() {
            return {
                search:"",
                liste:[],
                treeem:[],
                options:[]
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
            // await this.$store.dispatch('anakategori')
            //  console.log("this.anakategorilists", this.anakategorilists);
        },
        async mounted () {
            
            if(this.list != undefined){
                //  this.searchTree(this.list,null)
                //  console.log("list",this.list);
                this.options=this.list
            }    
            
            
        },
         methods: {
             
             filterFnAutoselect (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow
            // console.log(this.options);
            
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
          if (val.length < 3) {
                abort()
                return
            }
        update(
          () => {
            if (val === '') {
              this.options = this.list
            }
            else {
              const needle = val.toLowerCase()
              this.options = this.list.filter(v => v.stokturad.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
     },


            abortFilterFn () {
            // console.log('delayed filter aborted')
            },
  
           searchTree(selfQ, parentID){
      
                  let treemmenu = [];


                  selfQ.forEach((value, index) => {


                    
                    if(value.children.length){
                        treemmenu.push(value);
                    }    
                    // this.searchTree(selfQ, value._id);
                    });

                  this.treeem=treemmenu;
                //   this.options=this.treeem
                //    console.log(this.treeem);
                    //  return this.treeem
                    




               },
        },
    }
</script>

<style lang="scss" scoped>

</style>