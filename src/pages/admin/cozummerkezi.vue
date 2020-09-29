<template>
    <div class=" col-12">
        <q-tabs
          v-model="tab"
          
          class="q-pa-xl text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
      >
        <q-tab name="gg" label="Gizlilik ve Güvenlik" />
        <q-tab name="mss" label="Mesafeli Satış Sözleşmesi" />
        <q-tab name="ii" label="İade İşlemleri" />
        <q-tab name="kvkk" label="K.V.K.K" />
        <q-tab name="ssk" label="Sık Sorulan Sorular" />
          </q-tabs>
        <q-tab-panels class="q-pl-md q-pr-md" v-model="tab" animated>
          <q-tab-panel name="gg">
            <!-- <div class="text-h6">Mails</div> -->
            <div class=" text-right">
                
                <ckeditor  :config="editorConfig" v-model="gg" class="col-12 " ></ckeditor>
                <q-btn class="  q-mt-md"  color="primary" label="Kaydet" @click="ggMethod()" />
            </div>
            
            
          </q-tab-panel>
          <q-tab-panel name="mss" >
            <div class=" text-right">
                
                <ckeditor  :config="editorConfig" v-model="mss" class="col-12 "></ckeditor>
                <q-btn class="  q-mt-md"  color="primary" label="Kaydet" @click="ggMethod()"/>
            </div>
          </q-tab-panel>
          <q-tab-panel name="ii" >
            <div class=" text-right">
                
                <ckeditor  :config="editorConfig" v-model="ii" class="col-12 "></ckeditor>
                <q-btn class="  q-mt-md"  color="primary" label="Kaydet" @click="ggMethod() "/>
            </div>
          </q-tab-panel>
          <q-tab-panel name="kvkk" >
            <div class=" text-right">
                
                <ckeditor  :config="editorConfig" v-model="kvkk" class="col-12 "></ckeditor>
                <q-btn class="  q-mt-md"  color="primary" label="Kaydet" @click="ggMethod() "/>
            </div>
          </q-tab-panel>
          <q-tab-panel name="ssk" >
            <div class=" text-right">
                
                <ckeditor  :config="editorConfig" v-model="ssk" class="col-12 "></ckeditor>
                <q-btn class="  q-mt-md"  color="primary" label="Kaydet" @click="ggMethod() "/>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        
      
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import { Loading } from "quasar";
import  '../../statics/ckeditor4-vue';
export default {
    components: {
    
    'ckeditor':CKEditor.component
  },
    data() {
        return {
            tab:"gg",
            cid:"",
            gg:"",
            mss:"",
            ii:"",
            kvkk:"",
            ssk:"",




            editorConfig: {
                    // allowedContent: true,
                    // uiColor: "#AADC6E",
                    // editorUrl:'sdsfsdf',
                    height:1000,
                    toolbar : 
                        [
                        // { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
                        { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','-','Templates' ] },
                        { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                        { name: 'insert', items : [ 'Image','Table','HorizontalRule','Smiley','SpecialChar' ] },
                        // { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
                        { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
                        // { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton','HiddenField' ] },
                        '/',
                        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','-','RemoveFormat' ] },
                        { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
                            '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-' ] },
                        // { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                        // { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
                        
                        '/',
                        { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
                         { name: 'colors', items : [ 'TextColor','BGColor' ] },
                        { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-' ] },
                        { name: 'about' }
                ]
      }
        }
    },
    async mounted () {
        await this.cquery()
    },
     methods: {
        async ggMethod(){
            this.$apollo
                .mutate({
                    mutation: gql`
                    mutation cozumCreateOrUpdate($id: String, $gg: String, $mss: String, $ii: String, $kvkk: String, $ssk: String) {
                        cozumCreateOrUpdate(id: $id, gg: $gg, mss: $mss, ii: $ii, kvkk: $kvkk, ssk: $ssk) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.cid,
                    gg: this.gg,
                    mss: this.mss,
                    ii: this.ii,
                    kvkk: this.kvkk,
                    ssk: this.ssk,
                    }
                })
                .then(async data => {
                    console.log("Done");
                    await this.cquery()
                    // storageRef.delete()

                    // await this.resimlistrefresh();
                });
        },
        async cquery(){
            await axios
                    .post( process.env.API,{
                    query: `query cozumQuery{
                            cozumQuery{
                               _id
                               gg
                               mss
                               ii
                               kvkk
                               ssk
                                }
                            }`,
                    })
                    .then(data => {
                        console.log(data.data.data.cozumQuery);
                        if (data.data.data.cozumQuery == null) {

                            return 
                        }
                        this.cid=data.data.data.cozumQuery[0]._id
                        this.gg=data.data.data.cozumQuery[0].gg
                        this.mss=data.data.data.cozumQuery[0].mss
                        this.ii=data.data.data.cozumQuery[0].ii
                        this.kvkk=data.data.data.cozumQuery[0].kvkk
                        this.ssk=data.data.data.cozumQuery[0].ssk
                    })
        }
    },
}
</script>

<style lang="scss" scoped>

</style>