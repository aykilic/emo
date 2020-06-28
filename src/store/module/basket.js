import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import { Cookies } from "quasar";
// require('dotenv').config();

export default {
  
    state: {
      guid:"",
      uid:"",
      basketid:"",
      basketlist:[],
      ubasketlist:[],
      userdetaillists:[]
    },
    actions: {
         add_basketid({commit} ,type   )
         {
            commit('basketid', type);
            
        },
        add_guid({commit,dispatch,state} ,type)
         {
            // console.log("add_guid",type);
           if(type != undefined) {
            commit('set_guid', type)
            Cookies.set('guid',type)
            
        }else{
            if(state.guid != "" ){
                Cookies.set('guid',state.guid)

            }else{
                commit('set_guid', Cookies.get('guid'));

            }
        }
        dispatch('search_basketlist', Cookies.get('guid'));

         },
         delete_guid({commit} ,type   )
         {
            commit('set_guid',"");
            
        },
         add_uid({commit,dispatch} ,type   )
         {
            commit('set_uid', Cookies.get('uid'));
            dispatch('search_ubasketlist', Cookies.get('uid'));
            dispatch('search_userdetaillists', Cookies.get('uid'));

        },
        
        async search_basketlist({commit,state}, type){
            //  console.log("type1",type);
            await axios.post(
      
                'http://'+ process.env.API +':4000/graphql', {
                  
                 query: `query search_basketlist($guid:String){
                    search_basketlist(guid:$guid){
                        _id
                        uid
                        guid
                        stokid
                        stokad
                        varyantid
                        varyantoption1
                        varyantoption2
                        fiyat
                        path
                        publicid
                        count
                        kdv
                   }  
                 }`,
                   variables: {
                    guid: type
                    }
            }).then( (response) => { 
                    // console.log("response",response.data.data);
             commit('set_search_basketlist', response.data.data.search_basketlist);
               
            })
        },
        async search_ubasketlist({commit,state}, type){
            // console.log("type1",type);
            await axios.post(
      
                'http://'+ process.env.API +':4000/graphql', {
                  
                 query: `query search_ubasketlist($uid:String){
                    search_ubasketlist(uid:$uid){
                        _id
                        uid
                        guid
                        stokid
                        stokad
                        varyantid
                        varyantoption1
                        varyantoption2
                        fiyat
                        path
                        publicid
                        count
                        kdv
                   }  
                 }`,
                   variables: {
                    uid: type
                    }
            }).then( (response) => { 
                //    console.log("response",response.data.data);
             commit('set_search_ubasketlist', response.data.data.search_ubasketlist);
               
            })
        },
        async search_userdetaillists({commit,state}, type){
            // console.log("type1",type);
            await axios.post(
      
                'http://'+ process.env.API +':4000/graphql', {
                  
                 query: `query Search_Userdetail_Query($uid:ID){
                    Search_Userdetail_Query(uid:$uid){
                        _id
                        uid
                        baslik
                        ad_soyad
                        cep
                        tc_v_no
                        v_daire
                        email
                        adres
                        p_kodu
                        il
                        ilid
                        ilce
                        ilceid
                   }  
                 }`,
                   variables: {
                    uid: type
                    }
            }).then( (response) => { 
                //    console.log("response",response.data.data);
             commit('set_search_userdetaillists', response.data.data.Search_Userdetail_Query);
               
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
        set_uid(state, type){
            
            state.uid = type
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
        set_search_ubasketlist(state, type){
            //  console.log("type2",type);
            state.ubasketlist=type
            // console.log("state.basketlist",state.basketlist);
        },
        set_search_userdetaillists(state, type){
            //  console.log("type2",type);
            state.userdetaillists=type
            // console.log("state.basketlist",state.basketlist);
        },
        set_login(state, type){
            
          },
        set_logout(state, type){
            state.uid = ""
            Cookies.remove('uid');
          },
    },
    getters:{ 
        get_guid: (state, getters) => {
            return state.guid
          },
        get_uid:(state, getters) => {
            return state.uid
        },
        basketid: (state, getters) => {
            return state.basketid
        },
        get_basketlist: (state, getters) => {
            return state.basketlist
        },
        get_ubasketlist: (state, getters) => {
            return state.ubasketlist
        },
        get_userdetaillists: (state, getters) => {
            return state.userdetaillists
        },

        
    }
  };
  