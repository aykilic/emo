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
        reklam2list:[],
        reklam3list:[],
        reklam4list:[],
        stamplist:[],
    },
    actions:{
        async search_slider1listrefresh({commit,state}, type){
            await axios.post( process.env.API, {
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
                        reklam2
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
                        reklam3
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
                        reklam4
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
                        stamp
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
                let veri5=[]
                let veri6=[]
                let veri7=[]
                let veri8=[]
                    veri=res.data.data.sliderlist[0].slider1
                    veri2=res.data.data.sliderlist[0].slider2
                    veri3=res.data.data.sliderlist[0].reklam1
                    veri4=res.data.data.sliderlist[0].etiket1
                    veri5=res.data.data.sliderlist[0].reklam2
                    veri6=res.data.data.sliderlist[0].reklam3
                    veri7=res.data.data.sliderlist[0].reklam4
                    veri8=res.data.data.sliderlist[0].stamp
                    veri = _.orderBy(veri, ['sira'],['asc']);
                    veri2 = _.orderBy(veri2, ['sira'],['asc']);
                    veri3 = _.orderBy(veri3, ['sira'],['asc']);
                    veri4 = _.orderBy(veri4, ['sira'],['asc']);
                    veri5 = _.orderBy(veri5, ['sira'],['asc']);
                    veri6 = _.orderBy(veri6, ['sira'],['asc']);
                    veri7 = _.orderBy(veri7, ['sira'],['asc']);
                    veri8 = _.orderBy(veri8, ['sira'],['asc']);
                   await commit('search_slider1listrefresh', veri);
                   await commit('search_slider2listrefresh', veri2);
                   await commit('search_reklam1listrefresh', veri3);
                   await commit('search_etiket1listrefresh', veri4);
                   await commit('search_reklam2listrefresh', veri5);
                   await commit('search_reklam3listrefresh', veri6);
                   await commit('search_reklam4listrefresh', veri7);
                   await commit('search_stamplistrefresh', veri8);
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
        search_reklam2listrefresh(state, type){
            //  console.log("type2",type);
            state.reklam2list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_reklam3listrefresh(state, type){
            //  console.log("type2",type);
            state.reklam3list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_reklam4listrefresh(state, type){
            //  console.log("type2",type);
            state.reklam4list=type
            // console.log("state.basketlist",state.basketlist);
        },
        search_stamplistrefresh(state, type){
            //  console.log("type2",type);
            state.stamplist=type
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
        get_reklam2list: (state, getters) => {
            return state.reklam2list
        },
        get_reklam3list: (state, getters) => {
            return state.reklam3list
        },
        get_reklam4list: (state, getters) => {
            return state.reklam4list
        },
        get_stamplist: (state, getters) => {
            return state.stamplist
        },
    }
}