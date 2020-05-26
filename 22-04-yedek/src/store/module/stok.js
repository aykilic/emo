import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  
    state: {
      anakategorilist:[],
      anakategorizelist:[],
      activestoklistid:"",
      varyantlist:[],
    },
    
      // setUserid(state, type) {
      //   state.userDetay.userid = type;
  
  
      // },
      // loadData({
      //   commit
      // }) {
      //    axios.post(
      //     'http://localhost:4000/graphql', {
      //       query:`query anakategoriQuery($parentid: ID ){
      //         anakategoriQuery(parentid: $parentid){
      //                _id
      //                 stokturad
      //                 parentid
      //               }
      //            }`,
                 
      //          variables:{
                
      //           parentid: null,
                

      //          },
          
          
      // }).then((response) => {
      //     // console.log(response.data, this)
      //     commit('stokListData.anakategori', response.data)
      //     // commit('changeLoadingState', false)
      //   })
      // }
  
      
    
    actions: {
      // acUserid(vuexContext, type) {
  
      //   vuexContext.commit('setUserid', type)
  
      // }, 
     async anafunction({dispatch,commit}) {
      dispatch("varyantlist")
        dispatch("anakategori")
         

      },

      async anakategori({commit}) {
        
        await axios.post(
      
           'http://localhost:4000/graphql', {
             
            query: `{
              Query{
                stokturad
                parentid
                _id
                vars{
                  images{
                    path
                    publicid
                }}
                  
                    }
            }`,
       }
       ).then( (response) => { 
            let stokListData = response.data.data.Query
            
          commit('set_anakategorilist',stokListData);
          commit('set_anakategorizelist');
          

            // commit('set_anakategorilist',stokListData)
           // commit('changeLoadingState', false)
         })
        //  await axios.post(
        //   'http://localhost:4000/graphql', {
        //       query:`query childvaryantQuery{
        //           childvaryantQuery{
        //           _id
        //           stokid
        //           parentid
        //           varyantname
        //           color
        //           vars{
        //               images{
        //                       publicid
        //                       path
        //                       filename
        //                       imageurl
        //                       id
        //               }
        //           }
        //           }
        //           }`,
              
        //   }).then( (response) => { 
                     
        //     let varyantlist = response.data.data.childvaryantQuery
            
        //    commit('set_varyantlist',varyantlist);
        //   })
        },
      stoklistid({commit}, type){
        commit('set_activestoklistid', type);
      //  console.log(type);
      },
      async varyantlist({commit}){
        let varyantlist=await axios.post(
          'http://localhost:4000/graphql', {
              query:`query childvaryantQuery{
                  childvaryantQuery{
                  _id
                  stokid
                  parentid
                  varyantname
                  color
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
              
          }) 
                     
               
            
               commit('set_varyantlist',varyantlist.data.data.childvaryantQuery);
          
          

            // commit('set_anakategorilist',stokListData)
           // commit('changeLoadingState', false)
         
          
       
      }
      //  async anakategorize({commit,state}) {
      //   // let ibo = []
      //   // ibo = state.anakategorilist
      //      console.log(state.anakategorilist);
          
      // },
      
    },
    mutations:{
      set_anakategorilist(state, stokListzeData){
        state.anakategorilist = stokListzeData
          // console.log( state.anakategorilist );
      },
      set_anakategorizelist(state, stokListzeData){
        // console.log(state.anakategorilist);
        if(state){
          // console.log(state.anakategorilist);
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
                 
              //  return this.state.stokListData
          }  
          
        }









        // state.anakategorizelist = stokListzeData
        //  console.log( state.anakategorilist );
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
  
      // gusermail(state) {
      //
      //   return state.userDetay.useremail
      //
      //
      // }
    }
  };
  