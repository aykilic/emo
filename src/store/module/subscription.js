import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  
    state: {
        newSiparisList:[]
    },
    actions:{
        async search_getviewsiparis({commit,state}, type){
            //  console.log("type1",type);
            await axios.post(
      
                'http://'+ process.env.API +':4000/graphql', {
                  
                 query: `query search_getviewsiparis{
                    search_getviewsiparis{
                        _id
                        user{
                            _id
                            ad_soyad
                            cep
                            adres
                            il
                            ilce
                            v_daire
                            tc_v_no
                        }
                        odemetipi
                        odemedurumu
                        teslimat
                        sipno
                        aratoplam
                        kdv
                        tutar
                        createdAt
                   }  
                 }`,
                //    variables: {
                //     guid: type
                //     }
            }).then( (response) => { 
                    // console.log("response",response.data.data);
             commit('search_getviewsiparis', response.data.data.search_getviewsiparis);
               
            })
        },
    },
    mutations:{
        search_getviewsiparis(state, type){
            //  console.log("type2",type);
            state.newSiparisList=type
            // console.log("state.basketlist",state.basketlist);
        },
    },
    getters:{
        get_newSiparisList: (state, getters) => {
            return state.newSiparisList
        },
    }
}