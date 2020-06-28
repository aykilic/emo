import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  
    state: {
      anakategorilist:[],
      anakategorizelist:[],
      activestoklistid:"",
      varyantlist:[],
      urunlist:[]
    },
    actions: {
     async anafunction({dispatch,commit}) {
      dispatch("varyantlist")
      dispatch("anakategori")
      },

      async anakategori({commit}) {
        
        await axios.post(
      
          'http://'+ process.env.API +':4000/graphql', {
             
            query: `{
              Query{
                stokturad
                parentid
                fiyat1
                kdv
                description
                indirim
                _id
                vars{
                  images{
                    path
                    publicid
                }
              }
                
                    }
            }`,
       }
       ).then( (response) => { 
            let stokListData = response.data.data.Query
            
          commit('set_anakategorilist',stokListData);
          commit('set_anakategorizelist');
          

            
         })
       
        },
      stoklistid({commit}, type){
        commit('set_activestoklistid', type);
      //  console.log(type);
      },
      async varyantlist({commit}){
        await axios.post(
          'http://'+ process.env.API +':4000/graphql', {
              query:`query childvaryantQuery{
                  childvaryantQuery{
                  _id
                  stokid
                  parentid
                  varyantname
                  color
                  kdv
                  indirim
                  description
                  vars{
                      images{
                              publicid
                              path
                              filename
                              imageurl
                              id
                      }
                  }
                  }
                  }`,
              
          }).then((data)=>{
            commit('set_varyantlist',data.data.data.childvaryantQuery);
          })
      },
      urunlist({commit},type){
        console.log("type",type);
        commit('set_urunlist', type);
      },
    },
    //   async urunlist({commit}){
    //      await axios.post('http://'+ process.env.API +':4000/graphql', {
    //   query: `{
    //                 Query {
    //                           stokturad
    //                           _id
    //                           parentid
    //       }
    //     }`,
    //   loadingKey: "loading"
    // }).then((data)=>{
    //   commit('set_urunlist',data.data.data.Query);
    // });
      
      
    // },
      
     mutations:{
       set_urunlist(state,type){
         state.urunlist=type
       },
      set_anakategorilist(state, stokListzeData){
        state.anakategorilist = stokListzeData
          // console.log( state.anakategorilist );
      },
      async set_anakategorizelist(state, stokListzeData){
        // console.log(state.anakategorilist);
        // if(state){
          //  console.log("state.anakategorilist",state.anakategorilist);
            parseTree(state.anakategorilist);
             function parseTree(list, parentID=null) {
              let treeem = [];
                // console.log(list);
            
             list.forEach((value, index) => {
      
                  if(value.parentid===parentID){  
                    // console.log(value);
                    // console.log(stoklistData);
                     const children = parseTree(list, value._id);
                        
                          if (children) {
                              value.children = children;
                          }else{
                            value.children=[]
                          }
                            treeem.push(value)
                            //  console.log(treeem);
                     }
              });
      
              state.anakategorizelist = treeem
          }
      },
      
      set_activestoklistid(state, type){
        state.activestoklistid = type
        //  console.log(state.activestoklistid);
      },
      set_varyantlist(state, type){
        state.varyantlist = type
        //  console.log(state.activestoklistid);
      }
    },
    getters:{ 
  
      anakategorilists: (state, getters) => {
        return state.anakategorilist
      },
      anakategorizelists:(state,getters)=>{
        return state.anakategorizelist
      },
      activestoklistids:(state,getters)=>{
        return state.activestoklistid
      },
      getvaryantlist:(state,getters)=>{
        return state.varyantlist
      },
      geturunlists:(state,getters)=>{
        return state.urunlist
      },
      
  
      // gusermail(state) {
      //
      //   return state.userDetay.useremail
      //
      //
      // }
    }
  };
  