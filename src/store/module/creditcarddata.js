import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  
    state: {
        satirList:[],
        sipno:"",
        userid:"",
        siparisfis:{},
    },
    actions:{
        // async search_satirList({commit,state}, type){
        //     //  console.log("type1",type);
           
      
        //     // commit('search_getviewsiparis', response.data.data.search_getviewsiparis);
        // },
    },
    mutations:{
        mutation_satirList(state, type){
            //  console.log("type2",type);
            state.satirList=type
            // console.log("state.basketlist",state.basketlist);
        },
        mutation_sipno(state, type){
            //  console.log("type2",type);
            state.sipno=type
            // console.log("state.basketlist",state.basketlist);
        },
        mutation_userid(state, type){
            //  console.log("type2",type);
            state.userid=type
            // console.log("state.basketlist",state.basketlist);
        },
        mutation_siparisfis(state, type){
            //  console.log("type2",type);
            state.siparisfis=type
            // console.log("state.basketlist",state.basketlist);
        },
    },
    getters:{
        get_satirList: (state, getters) => {
            return state.satirList
        },
        get_sipno: (state, getters) => {
            return state.sipno
        },
        get_userid: (state, getters) => {
            return state.userid
        },
        get_siparisfis: (state, getters) => {
            return state.siparisfis
        },
    }
}