<template>
    <div class="px-0 my-2">
        <template v-if="publish && usersList">
            <template v-if="!read">
                {{getPublishShow()}}
            </template>
            <div v-if="read">
                <div v-if="$route.name=='Home' && user">
                    <CreatePublish :user="user" v-if="user" v-on:reload="reload" />
                </div>
                <div v-if="publishShow">
                    <div class="my-3 mx-auto col-12" :class="{'col-md-10': $route.name=='Home'}">
                        <div class="rounded mx-auto row col-md-10 col-lg px-2">
                            <button class="btn p-0 col bg-dark text-light" :class="{'mr-2':userView}" v-on:click="likeFilterAction()" v-if="userView">
                                <template v-if="!offLikes">
                                    <i class="fas fa-heart-broken"></i>
                                    Ocultar
                                </template>
                                <template v-if="offLikes">
                                    <i class="fas fa-heart"></i>
                                    Mostrar
                                </template>
                                publicaciones que le gustan
                            </button>
                        </div>
                    </div>
                    <div class="card mb-3 bg-transparent border-0 mx-0 col-12 mx-auto" v-for="pub in publishShow" :key="pub.id">
                        <div class="row no-gutters">
                            <div class="d-none d-md-block col-2 col-lg-1 pr-2" v-if="$route.name=='Home'">
                                <router-link :to="{name:'Profile', params:{userId:pub.author}}" class="ml-auto text-right">
                                    <img :src="getUser(pub.author).avatar?getUser(pub.author).avatar:'/favicon.png'" class="sticky-top pubProfileImg p-0 rounded-circle bg-dark" :class="{'sticky-prof-img':mobile}" height="50" style="z-index:1">
                                </router-link>
                            </div>
                            <div class="border-0 rounded mx-auto col" :class="getUser(pub.author).color.all + {'mr-md-auto': userView}">
                                <div class="card-header row mx-auto text-left">
                                    <p class="my-auto" :class="getUser(pub.author).color.text">
                                        <router-link :to="{name:'Profile', params:{userId:pub.author}}" class="my-auto font-weight-bold card-title" :class="getUser(pub.author).color.text">
                                            <img :src="getUser(pub.author).avatar" class="p-0 mx-0 align-middle rounded-circle d-inline-block d-md-none" :class="{'d-md-inline-block':userView}" height="30" v-if="getUser(pub.author).avatar">
                                            <a class="align-middle">{{getUser(pub.author).username}}</a>
                                        </router-link>
                                    </p>
                                    <button class="btn ml-auto p-0" :class="getUser(pub.author).color.text" v-if="user && (user.role=='admin' || pub.author==user.id)" @click="deletePub(pub)">
                                        <b-icon icon="trash"></b-icon>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <p class="card-text" :class="getUser(pub.author).color.text">{{pub.message}}</p>
                                </div>
                                <div class="card-footer mb-0 py-0 px-0 row col mx-auto">
                                    <div class="col text-left">
                                        <button class="btn" :class="getUser(pub.author).color.text" @click.prevent="likeAction(pub)" data-toggle="tooltip" data-placement="right" title="Me gusta" v-if="user">
                                            <i class="fa-heart" :class="{'fas':pub.like.indexOf(user.id)!=-1, 'far':pub.like.indexOf(user.id)==-1}"></i>
                                            {{pub.like.length}}
                                        </button>
                                        <button class="btn" :class="getUser(pub.author).color.text" data-toggle="tooltip" data-placement="right" title="Me gusta" v-else>
                                            <i class="fas fa-heart"></i>
                                            {{pub.like.length}}
                                        </button>
                                        
                                        <button class="btn" :class="getUser(pub.author).color.text" data-toggle="tooltip" data-placement="right" title="Ampliar">
                                            <i class="fas fa-expand-alt"></i>
                                        </button>
                                    </div>
                                    <div class="col align-middle my-auto text-right">
                                        <small class=" font-italic" :class="getUser(pub.author).color.text">- {{pub.time}}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 col-lg-1 pr-0 ml-auto text-right d-none d-md-block" v-if="$route.name=='Home'">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Sigue a algún usuario 😀
                </div>
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
import CreatePublish from '@/components/CreatePublish.vue'      
import $ from 'jquery'
const fb = require('@/firebase')
export default {
    name: 'Publish',
    props:['user', 'usersList', 'publish', 'userView'],
    components:{
        CreatePublish,
    },
    watch: {
        publish(newVal, oldVal){
            if(newVal[0] && newVal.length !== oldVal.length){
                this.getPublishShow()
            }
        },
        usersList(){
            
        }
    },
    data(){
        return{
            dot: '.',
            publishShow:null,
            read: false,
            offLikes: false,
            mobile: window.width<991
        }
    },
    mounted(){
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    },
    methods:{
        reload(){
            setTimeout(this.getPublishShow(), 2000);
        },
        deletePub(publication) {
            if(confirm("La publicacion\n" + publication.message + "\nestá por ser eliminada\nDesea continuar?")){
                console.log("deleted")
                publication.like.forEach(function(user) {
                    fb
                    .usersCollection
                    .doc(user)
                    .update({
                        likes: fb.fieldValue.arrayRemove(publication.id)
                    });
                });
                fb
                .usersCollection
                .doc(publication.author)
                .update({
                    pubCount: fb.fieldValue.increment(-1)
                });
                fb
                .publishCollection
                .doc(publication.id)
                .delete()
                .then(function() {
                    console.log("Eliminada con éxito");
                })
                .catch(function(error) {
                    console.log(error.message);
                });
                // this.$store.dispatch('setPublish');
                this.reload();
            }
        },
        likeFilterAction(){
            this.offLikes = !this.offLikes;
            this.getPublishShow();
        },
        likeAction(pub){
            var index = pub.like.indexOf(this.user.id);
            if(index!=-1){
                fb.publishCollection.doc(pub.id).update({
                    like: fb.fieldValue.arrayRemove(this.user.id)
                })
                pub.like.splice(index,1)
            }else{
                fb.publishCollection.doc(pub.id).update({
                    like: fb.fieldValue.arrayUnion(this.user.id)
                })
                pub.like.push(this.user.id)
            }
        },
        getUser(userToFind){
            var temp = this.usersList.filter(el => {
                return el.id == userToFind
            })
            return temp[0]
        },
        isProfile(el){
            return this.$route.name=='Profile' && (el.author == this.userView.id || (!this.offLikes && el.like != [] && el.like.indexOf(this.userView.id)!=-1))
        },
        isHome(el){
            return this.$route.name=='Home' && (!this.user || el.author==this.user.id ||  (this.user.follows?this.user.follows.indexOf(el.author)!=-1:false))
        },
        getPublishShow(){
            this.publishShow=[];
            this.publishShow = this.publish.filter(el =>{
                return this.isHome(el) || this.isProfile(el) || this.$route.name=="Search"
            })
            this.read=true
        },
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

<style scoped>
a:hover{
    text-decoration: none;
}
.sticky-prof-img{ /*mobile*/
    position: -webkit-sticky;
    position: sticky;
    top: 58px;
    z-index: 1001;
}
.sticky-top{ /*desktop*/
    top:0.5rem
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
  border: 10px solid #eee;
  border-top: 10px solid #666;
  border-radius: 50%;
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