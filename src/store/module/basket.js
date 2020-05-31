import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import { Cookies } from "quasar";


export default {
  
    state: {
      guid:"",
      uid:"",
      basketid:"",
      basketlist:[],
    },
    
      
  
      
    
    actions: {
         add_basketid({commit} ,type   )
         {
            commit('basketid', type);
            
        },
        add_guid({commit,state} ,type)
         {
            //   console.log(type);
           if(type != undefined) {
            commit('set_guid', type);
            Cookies.set('guid',type)
        }else{
            if(state.guid != "" ){
                Cookies.set('guid',state.guid)
            }else{
                commit('set_guid', Cookies.get('guid'));
            }
        }
         },
         add_uid({commit} ,type   )
         {
            commit('uid', Cookies.get('uid'));
            
        },
        async search_basketlist({commit,state}, type){
            // console.log("type1",type);
            await axios.post(
      
                'http://localhost:4000/graphql', {
                  
                 query: `query search_basketlist($guid:ID!){
                    search_basketlist(guid:$guid){
                        _id
                        guid
                        stokid
                        stokad
                        varyantid
                        varyantoption1
                        varyantoption2
                        path
                        publicid
                        count
                   }  
                 }`,
                   variables: {
                    guid: type
                    }
            }).then( (response) => { 
                //  console.log("response",response.data.data);
             commit('set_search_basketlist', response.data.data.search_basketlist);
               
            })
        },
         logout({commit} ,type   )
         {
            commit('set_logout',type);
            
        },
    },
    mutations:{
        set_guid(state, type){
            
            state.guid = type;
            // console.log(Cookies.get('guid'));
          },

        set_basketid(state, type){
            state.basketid = type
            Cookies.set('basketid',type);
          },
        set_search_basketlist(state, type){
            // console.log("type2",type);
            state.basketlist=type
            // console.log("state.basketlist",state.basketlist);
        },
        set_login(state, type){
            
          },
        set_logout(state, type){
            state.uid = type
            Cookies.set('uid',type);
          },
    },
    getters:{ 
        get_guid: (state, getters) => {
            return state.guid
          },
        basketid: (state, getters) => {
            return state.basketid
        },
        get_basketlist: (state, getters) => {
            return state.basketlist
        },
        get_uid:(state, getters) => {
            return state.uid
        },
    }
  };
  