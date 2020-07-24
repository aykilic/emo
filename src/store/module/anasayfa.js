import Vue  from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import _ from "lodash";
export default {
  
    state: {
        slider1list:[],
        slider2list:[],
        reklam1list:[],
        etiket1list:[],
    },
    actions:{
        async search_slider1listrefresh({commit,state}, type){
            await axios.post('http://'+ process.env.API +':4000/graphql', {
            query: `query sliderlist{
             sliderlist{
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
                  slider2
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
                    reklam1
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
                    etiket1
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
                let veri2=[]
                let veri3=[]
                let veri4=[]
                    veri=res.data.data.sliderlist[0].slider1
                    veri2=res.data.data.sliderlist[0].slider2
                    veri3=res.data.data.sliderlist[0].reklam1
                    veri4=res.data.data.sliderlist[0].etiket1
                    veri = _.orderBy(veri, ['sira'],['asc']);
                    veri2 = _.orderBy(veri2, ['sira'],['asc']);
                    veri3 = _.orderBy(veri3, ['sira'],['asc']);
                    veri4 = _.orderBy(veri4, ['sira'],['asc']);
                   await commit('search_slider1listrefresh', veri);
                   await commit('search_slider2listrefresh', veri2);
                   await commit('search_reklam1listrefresh', veri3);
                   await commit('search_etiket1listrefresh', veri4);
                });  
            }
    },
    mutations:{
        search_slider1listrefresh(state, type){
            //  console.log("type2",type);
            state.slider1list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_slider2listrefresh(state, type){
            //  console.log("type2",type);
            state.slider2list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_reklam1listrefresh(state, type){
            //  console.log("type2",type);
            state.reklam1list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_etiket1listrefresh(state, type){
            //  console.log("type2",type);
            state.etiket1list=type
            // console.log("state.basketlist",state.basketlist);
        },
    },
    getters:{
        get_slider1list: (state, getters) => {
            return state.slider1list
        },
        get_slider2list: (state, getters) => {
            return state.slider2list
        },
        get_reklam1list: (state, getters) => {
            return state.reklam1list
        },
        get_etiket1list: (state, getters) => {
            return state.etiket1list
        },
    }
}