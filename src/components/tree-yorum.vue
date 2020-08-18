<template>
    <div class="row justify-center">
       
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
                          <div class="row" v-if="children.votes.length && children.is_vote">
                            <!-- <div class="row" v-if="children.votes.length "> -->
                                <q-icon  class="q-mr-md " :class="(children.vote == 1)  ? 'select-like-icons' :'like-icons'" @click="children.vote == -1 ? children.vote = 1 : children.vote == 1 ? children.vote = 0 : children.vote = 1  ,like( children._id, children.vote, 1)"  style="font-size: 20px;" /><q-item-label>{{children.like}}</q-item-label> 
                                <q-icon  class="q-mr-md q-ml-md " :class="(children.vote == -1)  ? 'select-dislike-icons' :'dislike-icons'"  @click="children.vote == 1 ? children.vote = -1 : children.vote== -1 ? children.vote = 0 : children.vote = -1 , like( children._id, children.vote, 1)"  style="font-size: 20px;" /><q-item-label>{{children.dislike}}</q-item-label> 
                            <!-- </div>  -->
                          </div>    
                          <div class="row" v-else>
                                <q-icon  class="q-mr-md like-icons"  @click=" like( children._id, 1, 0)"  style="font-size: 20px;" /><q-item-label>{{children.like}}</q-item-label> 
                                <q-icon  class="q-mr-md q-ml-md dislike-icons"   @click=" like( children._id, -1, 0)"  style="font-size: 20px;" /><q-item-label>{{children.dislike}}</q-item-label> 
                            
                          </div>
                      
                       <!-- <div v-if="children.votes.length ">
                          <div v-if="kontrol = 1"></div>
                        <div v-for="(votes ,i) in children.votes" :key="i"  class=" row text-center text-weight-medium" >
                            
                            <div class="row" v-if="(votes.userid == get_uid) && (kontrol == 1)">
                                1
                          <q-icon   class="q-mr-md " :class="(votes.userid == get_uid) && (votes.vote === 1) ? 'select-like-icons' :'like-icons'" @click="votes.vote == -1 ? votes.vote = 1 : votes.vote== 1 ? votes.vote = 0 : votes.vote = 1 , like( children._id, votes.vote, 1)"  style="font-size: 20px;" /><q-item-label>12</q-item-label> 
                          <q-icon  class="q-mr-md q-ml-md" :class="(votes.userid == get_uid) && (votes.vote === -1) ? 'select-dislike-icons': 'dislike-icons'" @click="votes.vote == 1 ? votes.vote = -1 : votes.vote== -1 ? votes.vote = 0 : votes.vote = -1 , like( children._id, votes.vote, 1)"  style="font-size: 20px;" /><q-item-label>12</q-item-label> 
                          <div v-if="kontrol = 0"></div>
                          </div>
                          
                          <div class="row" v-if="(votes.userid != get_uid) && (kontrol == 1) ">
                              2
                            <q-icon   class="q-mr-md " :class="'like-icons'" @click="votes.vote == -1 ? votes.vote = 1 : votes.vote== 1 ? votes.vote = 0 : votes.vote = 1 , like( children._id, votes.vote, 0)"  style="font-size: 20px;" /><q-item-label>12</q-item-label> 
                            <q-icon   class="q-mr-md q-ml-md" :class="'dislike-icons'" @click="votes.vote == -1 ? votes.vote = 1 : votes.vote== 1 ? votes.vote = 0 : votes.vote = 1 , like( children._id, votes.vote, 0)"  style="font-size: 20px;" /><q-item-label>12</q-item-label> 
                          <div v-if="kontrol = 0"></div>
                          </div>
                           
                        </div>
                      </div>     -->
                     <!-- <div v-else>
                          <div v-if="(kontrol == 1)">
                          <div   class="row text-center text-weight-medium ">
                          <q-icon  class="q-mr-md " :class="'like-icons'" style="font-size: 20px;" @click=" like( children._id, 1, 0)"/> <q-item-label>12</q-item-label> 
                          <q-icon  class="q-mr-md q-ml-md dislike-icons"  style="font-size: 20px;" @click=" like( children._id, -1, 0)"/> <q-item-label>12</q-item-label> 
                          </div>
                          </div>
                      </div> -->
                      <!-- <div v-if="a = false"></div> -->
                      </div>
                    </div>
                    
                  </div>
                  
                  <tree-yorum 
                    v-if="children.children.length > 0"
                    :nodes="children.children" 
                    :depth="depth + 1"
                    :stokid="stokid"
                    
                    
                    >
                  </tree-yorum>
            
        </div>
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
        props: [ 'nodes','depth','stokid' ],
        data() {
            return {
                moment:moment,
                likedata:false,
                dislikedata:false,
                voteClass:"",
                
                
            }
        },
        watch: {
            yorum(val){
                console.log("yorum",val);
                
            },
            
        },
        computed:{
            
            ...mapGetters([
                
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
               console.log("nodes",this.nodes);
        },
        methods: {
            like( yorumid, vote, set) {
                //  console.log("set");
                //  return
                // console.log(set);
                // return
                // this.likedata= !this.likedata
                // if(this.likedata){
                //     vote ++
                // }else{
                //     vote --
                // }
                console.log("likedata",vote);
                //  return
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
            dislike() {
                console.log("dislike");
            },

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