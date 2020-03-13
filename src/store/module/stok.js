import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  
    state: {
      anakategorilist:[],
      anakategorizelist:[],
      activestoklistid:"",
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
       ).then(async (response) => { 
                     
            let stokListData = response.data.data.Query
            
          commit('set_anakategorilist',stokListData);
          commit('set_anakategorizelist');
          

            // commit('set_anakategorilist',stokListData)
           // commit('changeLoadingState', false)
         })
       },
      stoklistid({commit}, type){
        commit('set_activestoklistid', type);
      //  console.log(type);
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
      }
  
      // gusermail(state) {
      //
      //   return state.userDetay.useremail
      //
      //
      // }
    }
  };
  