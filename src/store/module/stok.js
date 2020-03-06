import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
    state: {
      
      anakategorilist:[],
      
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
      //      'http://localhost:4000/graphql', {
      //        query:`query anakategoriQuery($parentid: ID ){
      //          anakategoriQuery(parentid: $parentid){
      //                 _id
      //                  stokturad
      //                  parentid
      //                }
      //             }`,
                  
      //           variables:{
                  
      //            parentid: null,
                 
 
      //           },
           
           
      //  }
           'http://localhost:4000/graphql', {
             
            query: `{
              Query{
                stokturad
                parentid
                _id
                    }
            }`,
                
           
           
       }
       ).then((response) => { 
                     // console.log(response.data.data.anakategoriQuery)
            let stokListData = response.data.data.Query
            // parentID=null;
            // parseTree(stokListData);
            
          //  function parseTree(stokListData, parentID=null) {
          //     let treem = [];
          //     //  console.log(stokListData);
            
          //    stokListData.forEach((value, index) => {
      
          //         if(value.parentid===parentID){  
          //           // console.log(value);
          //           console.log(stoklistData);
          //            const children = parseTree(stokListData, value._id);
                        
          //                 if (children) {
          //                     value.children = children;
          //                 }else{
          //                   value.children=[]
          //                 }
          //                   treem.push(value)
          //            }
          //     });
      
          //     commit('set_anakategorilist',treem);
          //       // console.log(state.anakategorilist);
          //     //  return this.state.stokListData
          // }  
             
          commit('set_anakategorilist',stokListData);




            // commit('set_anakategorilist',stokListData)
           // commit('changeLoadingState', false)
         })
       }
      
    },
    mutations:{
      set_anakategorilist(state, stokListData){
        state.anakategorilist = stokListData
        //  console.log( state.anakategorilist );
      }
    },
    getters:{ 
  
      anakategorilists: (state, getters) => {
        return state.anakategorilist
      }
      
  
      // gusermail(state) {
      //
      //   return state.userDetay.useremail
      //
      //
      // }
    }
  };
  