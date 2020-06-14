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
      }
      
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
  