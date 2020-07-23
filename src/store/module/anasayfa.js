import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import _ from "lodash";
export default {
  
    state: {
        slider1list:[]
    },
    actions:{
        async search_slider1listrefresh({commit,state}, type){
            await axios.post('http://'+ process.env.API +':4000/graphql', {
            query: `query slider1list{
             slider1list{
                  slider1
                      {
                        _id
                        publicid
                        path
                        filename
                        imageurl
                        stokturad
                        stokid
                        sira
                        
                    }
                }
             }`,
            }).then(async res => {
                let veri=[]
                    veri=res.data.data.slider1list[0].slider1
                    veri = _.orderBy(veri, ['sira'],['asc']);
                    commit('search_slider1listrefresh', veri);
                });  
            }
    },
    mutations:{
        search_slider1listrefresh(state, type){
            //  console.log("type2",type);
            state.slider1list=type
            // console.log("state.basketlist",state.basketlist);
        },
    },
    getters:{
        get_slider1list: (state, getters) => {
            return state.slider1list
        },
    }
}