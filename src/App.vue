<template>
  <div id="app" class="mx-auto row container-fluid px-0">
    <template v-if="publish && usersList">
      <Navigation class="col-12 col-lg-2 px-0 mx-0" id="navigation" :user="user" :usersList="usersList" />
      <div id="content" class="col mx-auto p-2 mb-5 mb-lg-2" :class="{'my-auto':$route.name=='About'}">
        <vue-page-transition name="fade">
          <router-view class="text-center" :usersList="usersList" :publish="publish" :user="user" :key="$route.path" :news="news" :chats="chats" />
        </vue-page-transition>
      </div>
    </template>
    <template v-else>
      <div class="preloader"></div>
      <b-container class="fixed-bottom text-center mx-auto my-5 font-weight-bold text-light">
          Cargando{{dots()}}
      </b-container>
    </template>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'App',
  data(){
    return{
      dot:'.'
    }
  },
  components: {
    Navigation,
  },
  mounted(){
    var height = $("#navigation").height();
    if(window.innerWidth<991 && height){
      $("#content").css('margin-top',height + "px");
    }
  },
  computed:{
    ...mapState(['user', 'usersList', 'publish', 'hiddenPublish', 'fbUser', 'news', 'chats'])
  },
  methods:{
    dots(){
        setTimeout(()=>{
            if(this.dot=="..."){
            this.dot=".";
            }else{
            this.dot+=".";
            }
        }, 500)
        return this.dot;
    }
  }
}
</script>

<style>
@import url('styles.css');
.pubProfileImg{
  padding-top:64px;
}
.nav-link{
  cursor: pointer;
}
.bg-page{
  background: #121212;
}
.bg-black{
    background: #030303;
}
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 70px;
  height: 70px;
  border: 10px solid #121212;
  border-top: 10px solid rgba(255,255,255,0.1);
  border-bottom: 10px solid rgba(255,255,255,0.1);
  border-radius: 100%;
  animation-name: girar;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
