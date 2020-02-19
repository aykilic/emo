<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="  text-amber-1 bg-grey-1 text-grey-9 text-weight-bold justify-center" >
        
        <div class="row col-8 q-pt-lg q-pb-lg">
        <div class="col-2 self-center">LoGoo...! <br> ...............</div>
        <div class=col-6>

          <q-input rounded outlined dense v-model="search" placeholder="Kategori yada Ürün Ara" >
              <template v-slot:append>
          <q-icon name="search" />
        </template>
          </q-input>

          

        </div>
        
        <div class=" col-4">
          <div class="justify-end row">
          <div class="title-icons text-center col-2 text-caption"><q-icon class="icon-person"   style="font-size: 26px;"/>Hesabım</div>
          <div class="q-ml-lg title-icons text-center col-2 text-caption"><q-icon class="icon-heart" name=""   style="font-size: 26px;"/>Favorilerim</div>
          <div class="q-ml-lg title-icons text-center col-2 text-caption"><q-icon class="icon-cart"  name=""  style="font-size: 26px;"/>Sepetim</div>
          </div>
          <!-- <q-icon  name="o_person"  style="font-size: 32px;"/>
          <q-icon class="q-ml-md" name="o_favorite_border"  style="font-size: 30px;"/>
          <q-icon class="q-ml-lg" name="o_shopping_cart"  style="font-size: 32px;"/> -->
          </div>
        </div>
      </q-toolbar>
    </q-header>

    

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  data () {
    return {
      search: null,
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        }
      ]
    }
  }
}
</script>
<style scope>
/* @import '../../node_modules/@quasar/extras/mdi-v4/mdi-v4.css'; */
  .title-icons {
    cursor:pointer;
    
  }
  .title-icons  .icon-person::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    position:absolute;
    content:"\F013";
  }  
  .title-icons:hover .icon-person::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    content:'\F004';
  }
  .title-icons  .icon-heart::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    position:absolute;
    content:"\F2D5";
  }  
  .title-icons:hover .icon-heart::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    content:'\F2D1';
  }
  .title-icons  .icon-cart::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    position:absolute;
    content:"\F111";
    
  }  
  .title-icons:hover .icon-cart::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    transition: all 2.5s;
    content:'\F110';
  }

</style>