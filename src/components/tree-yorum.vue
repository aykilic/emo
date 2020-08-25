<template>
    <div class="">
       
            <div class="row col-xs-12 col-md-12  "  v-for="(children ,i) in nodes" :key="i" >
                <div v-if="i > 0" class="row col-12 q-mt-md q-mb-md"><q-separator /></div>
                <div  class="row col-12 " :style="indent" style="margin-top:25px;" >
                    
                    <div class="" style="width:65px;"><q-avatar  color="grey-5 " >{{children.User.username[0].toUpperCase()}}</q-avatar></div>
                    <div class="row col">
                      <q-item-label class="text-weight-bold ">{{children.User.username}} </q-item-label> 
                      <q-item-label style="margin-top:0;  " class="text-weight-bold  q-ml-md q-mr-md"> - </q-item-label> 
                      <q-item-label style="margin-top:0;  " class="text-grey-5 text-weight-medium "> {{moment(children.createdAt).fromNow()}} </q-item-label>
                      <q-item-label style="text-align: justify;margin-top:10px;" class="col-12">{{children.yorum}} </q-item-label>
                      <!-- <q-btn round color="primary" icon="mdi-thumb-up" /> -->
                      
                      <div class="q-mt-md row">
                          <div class="row" v-if="children.votes.length && children.is_vote && get_uid">
                            <!-- <div class="row" v-if="children.votes.length "> -->
                                
                                <q-item-label v-if="depth==0" @click="yorummodel=true,yorumid=children._id" class="q-mr-md cursor-pointer" style="opacity:0.6;">Cevapla</q-item-label>
                                <q-icon  class="q-mr-md " :class="(children.vote == 1)  ? 'select-like-icons' :'like-icons'" @click="children.vote == -1 ? children.vote = 1 : children.vote == 1 ? children.vote = 0 : children.vote = 1  ,get_uid == undefined || get_uid == '' || get_uid == null ? logindialog() :like( children._id, children.vote, 1)"  style="font-size: 20px;" /><q-item-label>{{children.like}}</q-item-label> 
                                <q-icon  class="q-mr-md q-ml-md " :class="(children.vote == -1)  ? 'select-dislike-icons' :'dislike-icons'"  @click="children.vote == 1 ? children.vote = -1 : children.vote== -1 ? children.vote = 0 : children.vote = -1 ,get_uid == undefined || get_uid == '' || get_uid == null  ? logindialog() : like( children._id, children.vote, 1)"  style="font-size: 20px;" /><q-item-label>{{children.dislike}}</q-item-label> 
                                <div class=" q-ml-md cursor-pointer" @click="yorummodel=true,edit=true,yorumobj={userid:children.userid,yorumid:children._id,parentid:children.parentid,yorum:children.yorum},yorum=children.yorum" v-if="children.userid == get_uid || get_user.role == 'superuser' || get_user.role == 'admin'"> Düzenle </div>
                                <!-- <div class="q-mr-md q-ml-md cursor-pointer" @click="yorumDelete(children.userid, children._id, children.parentid, depth)" v-if="get_user.role == 'superuser' || get_user.role == 'admin'"> Sil </div> -->
                            <!-- </div>  -->
                                
                          </div>   

                          <div class="row" v-else>
                              
                              <q-item-label v-if="depth==0" @click="yorummodel=true" class="q-mr-md cursor-pointer" style="opacity:0.6;">Cevapla</q-item-label>
                                <q-icon  class="q-mr-md like-icons"  @click="get_uid == undefined || get_uid == '' || get_uid == null  ? logindialog() : like( children._id, 1, 0)"  style="font-size: 20px;" /><q-item-label>{{children.like}}</q-item-label> 
                                <q-icon  class="q-mr-md q-ml-md dislike-icons"   @click="get_uid == undefined || get_uid == '' || get_uid == null  ? logindialog() : like( children._id, -1, 0)"  style="font-size: 20px;" /><q-item-label>{{children.dislike}}</q-item-label> 
                                <div class="q-mr-md q-ml-md cursor-pointer" @click="yorummodel=true,edit=true,yorumobj={userid:children.userid,yorumid:children._id,parentid:children.parentid,yorum:children.yorum},yorum=children.yorum" v-if="get_user.role == 'superuser' || get_user.role == 'admin'"> Düzenle </div>
                                <!-- <div class="q-mr-md q-ml-md cursor-pointer" @click="yorumDelete(children.userid, children._id, children.parentid, depth)" v-if="get_user.role == 'superuser' || get_user.role == 'admin'"> Sil </div> -->
                          </div>
                      
                           
                      </div>
                      
                    </div>
                    
                  </div>
                  
                  <tree-yorum 
                    v-if="children.children.length > 0"
                    :nodes="children.children" 
                    :depth="depth + 1"
                    :stokid="stokid"
                    :key="componentKey"
                    
                    >
                  </tree-yorum>
            
        </div>
        <q-dialog
            v-model="yorummodel"

          >
            <q-card  style="width: 500px; max-width: 160vw;">
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Yorum Girişi</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            <q-separator/>
              <q-card-section class="row ">
                <q-input outlined v-model="yorum" label="Yorum" type="textarea" class="col-12 q-mb-md"/>
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn v-if="edit" class="text-black"  color="" label="Gönder" @click="yorumEdit()" v-close-popup ></q-btn>
                <q-btn v-else class="text-black"  color="" label="Gönder" @click="yorumcevapla()" v-close-popup ></q-btn>
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
            </q-card>
          </q-dialog>
    </div>
</template>

<script>
import treeYorum from "./tree-yorum.vue";
import axios from "axios";
import gql from "graphql-tag";
import { Loading } from "quasar";
import { mapState, mapGetters } from "vuex";
import moment from 'moment'

    export default {
        name:"treeYorum",
        components: { treeYorum },
        props: [ 'nodes','depth','stokid','componentKey' ],
        data() {
            return {
                moment:moment,
                likedata:false,
                dislikedata:false,
                voteClass:"",
                yorummodel:false,
                edit:false,
                yorum:"",
                yorumid:"",
                yorumobj:{}
                
                
            }
        },
        watch: {
            yorum(val){
                // console.log("nodes",this.nodes);
                
            },
            
        },
        computed:{
            
            ...mapGetters([
                "get_user",
                "get_uid",
                ]),
    
            indent() {
                
                // return { transform: `translate(${this.depth * 18.9}%,${this.depth * 18.9}%)` }
                return { transform: `translate(${this.depth * 65}px)` }
                },
        marg(){
                // let asd=  { 'margin': `${this.depth * 50}px` }
                // console.log(asd);
                // return { 'margin-top': `${this.depth * 50}px` }
        }
        },
        mounted () {
                // console.log("get_user",this.get_user);
        },
        methods: {
            like( yorumid, vote, set) {
                
                Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation votes_mutation($stokid:ID ,$userid: ID, $yorumid:ID ,$vote: Float, $set: Float) {
                            votes_mutation(stokid: $stokid, userid: $userid, yorumid: $yorumid, vote: $vote, set: $set) {
                                
                                    _id
                                
                            }
                            }
                        `,
                        variables: {
                            stokid:this.stokid,
                            userid:this.get_uid,
                            yorumid:yorumid,
                            vote:vote,
                            set:set
                        },
                    })
                        .then(async data => {
                            // console.log(data);
                            await this.$store.dispatch('anakategori')
                             this.$emit('refreshYorum')
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
            },
            logindialog() {
                // console.log("logindialog");
                this.$q.dialog({
                    title: 'Uyarı...!',
                    message: 'Oy kullanabilmek için "LOGİN" olmalısınız. ',
                    cancel: false,
                    persistent: true
                }).onOk(() => {
                    // console.log('>>>> OK')
                }).onOk(() => {
                    // console.log('>>>> second OK catcher')
                }).onCancel(() => {
                    // console.log('>>>> Cancel')
                }).onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                })
            },
            yorumcevapla(){
                // console.log("cevapla",id);
                Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation createYorum($id: ID, $userid:ID, $parentid:ID, $yorum:String) {
                            createYorum(id: $id, userid: $userid, parentid: $parentid, yorum: $yorum) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          id: this.stokid,
                          userid: this.get_uid,
                          parentid:this.yorumid,
                          yorum:this.yorum
                        }
                        })
                        .then(async data => {
                            await this.$store.dispatch('anafunction')
                          this.yorum=""
                          //  await this.numaralar_guncelle()
                            // console.log("ok");
                            // await this.delete_basketsellproduct(satirList)
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
            },
            yorumEdit(userid, yorumid, parentid, yorum){


                // console.log(this.yorumobj);
                // return
                Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation yorumEditMutation($stokid: ID, $yorumid:ID, $yorum:String) {
                            yorumEditMutation(stokid:$stokid, yorumid: $yorumid, yorum: $yorum) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          stokid:this.stokid,
                          yorumid: this.yorumobj.yorumid,
                          yorum:this.yorum
                        }
                        })
                        .then(async data => {
                            await this.$store.dispatch('anafunction')
                          this.yorum=""
                          this.yorumobj={}
                          //  await this.numaralar_guncelle()
                            // console.log("ok");
                            // await this.delete_basketsellproduct(satirList)
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
            },
            yorumDelete(userid, yorumid, parentid, depth){
                console.log(userid, yorumid, parentid, depth);

            }
        },
    }
</script>

<style lang="stylus" scoped>
.like-icons, .dislike-icons, .select-like-icons,.select-dislike-icons{
    cursor:pointer;
    
  }
  .select-like-icons::before{
    // pointer-events: none;
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    content:'\F513';
    opacity:0.5;
    }
  .like-icons::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    content:'\F514';
    opacity:0.5;
    }
  .like-icons:hover::before{
        // color:blue;
        content:'\F514'; 
        // opacity:0;
        animation: toColor 0.5s;

    }
    .select-dislike-icons::before{
    pointer-events: none;
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    color:red
    font-size: 20px;
    content:'\F511';
        opacity:0.5;
        
    }
  .dislike-icons::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    color: red;
    font-size: 20px;
    content:'\F512';
    opacity:0.5;
    // animation: toColor 0.5s;
    }
    .dislike-icons:hover::before{
    content:'\F512'; 
    animation: toColor 0.5s;
}
@keyframes toColor {
    0%    { -webkit-filter: opacity(20%); filter: opacity(20%); }
    30%   { -webkit-filter: opacity(40%); filter: opacity(40%); }
    60%   { -webkit-filter: opacity(60%); filter: opacity(60%); }
    75%   { -webkit-filter: opacity(80%); filter: opacity(80%); }
    100%  { -webkit-filter: opacity(100%); filter: opacity(100%); }
}
</style>