<template>
    <div class="pt-5">
        <div v-if="usersList">
            <template v-if="!userInView">
                {{getUser(userId)}}
            </template>
            <div class="container pt-5" v-if="userInView">
                <div class="rounded p-3 shadow" :class="userInView.color.all">
                    <div class="row mx-auto">
                        <div class="col-lg-4 col-12 order-4 order-lg-1 row mx-auto py-2">
                            <hr class="col-12 bg-light d-block d-lg-none">
                            <div class="col-4 mx-auto my-auto text-center">
                                <p class="my-0 mx-auto">
                                    <i class="fas fa-users"></i> {{userInView.followers?userInView.followers.length:0}}
                                </p>
                            </div>
                            <div class="col-4 mx-auto my-auto text-center">
                                <p class="my-0 mx-auto">
                                    <i class="fas fa-user"></i> {{userInView.follows?userInView.follows.length:0}}
                                </p>
                            </div>
                            <div class="col-4 mx-auto my-auto text-center">
                                <p class="my-0 mx-auto">
                                    <i class="fas fa-sticky-note"></i> {{userInView.pubCount?userInView.pubCount:0}}
                                </p>
                            </div>
                            <div class="col-12 mx-auto my-auto text-center" v-if="userInView.time">
                                <p class="my-0 mx-auto">
                                    <i class="fas fa-calendar"></i> {{userInView.time}}
                                </p>
                            </div>
                            <hr class="col-12 bg-light d-block d-lg-none">
                        </div>
                        <div class="col-lg-4 col-12 order-1 order-lg-2 row mx-auto">
                            <div class="col-1" v-if="(userInView.role=='coadmin' || userInView.role=='admin') && mobile"></div>
                            <div class="col">
                                <img class="mx-auto d-block img-fluid rounded-circle profileImg" :class="userInView.color.all" :src="userInView.avatar?userInView.avatar:'/favicon.png'" alt="">
                            </div>
                            <i class="fas fa-check-circle mx-2 align-top col-1" :class="userInView.color.text" style="font-size:25px" v-if="userInView.role=='coadmin' && mobile" data-toggle="tooltip" data-placement="right" title="Coadmin"></i>
                            <i class="fas fa-user-astronaut mx-2 align-top col-1" :class="userInView.color.text" style="font-size:25px" v-else-if="userInView.role=='admin' && mobile" data-toggle="tooltip" data-placement="right" title="Admin"></i>
                        </div>
                        <div class="col-lg-4 col-12 order-5 order-lg-3 my-2">
                            <div class="row mx-auto text-center pt-2">
                                <router-link :to="{name:'Home'}" class="btn py-0 bg-transparent mx-auto col my-auto" :class="userInView.color.text" v-if="user && userInView.id!=user.id">
                                    Mensaje
                                </router-link>
                                <button class="col btn" @click="logOut()" :class="user.color.text" v-else-if="user && userInView.id!=user.id">
                                    Cerrar sesión
                                </button>
                                <button class="btn py-0 bg-transparent border mx-auto col my-auto" :class="userInView.color.text" v-on:click="followAction(userInView.id)" v-if="user && userInView.id!=user.id">
                                    <template v-if="user.follows.indexOf(userInView.id)==-1">
                                        <i class="fas fa-user-plus"></i>
                                        Seguir
                                    </template>
                                    <template v-else>
                                        <i class="fas fa-user-slash"></i>
                                        Dejar de seguir
                                    </template>
                                </button>
                                <button class="btn py-0 bg-transparent mx-auto col my-auto" :class="userInView.color.text" v-on:click="editAction()" v-if="user && userInView.id==user.id">
                                    Editar
                                </button>
                                <i class="fas fa-check-circle mx-2 align-middle my-auto col my-auto" :class="userInView.color.text" style="font-size:25px" v-if="userInView.role=='coadmin' && !mobile" data-toggle="tooltip" data-placement="right" title="Coadmin"></i>
                                <i class="fas fa-user-astronaut mx-2 align-middle my-auto col my-auto" :class="userInView.color.text" style="font-size:25px" v-if="userInView.role=='admin' && !mobile" data-toggle="tooltip" data-placement="right" title="Admin"></i>
                            </div>
                        </div>
                        <div class="col-12 order-2 order-lg-4">
                            <h5 class="my-0 font-weight-bold">
                                {{userInView.username}}
                            </h5>
                            <p class="my-0">
                                @{{userInView.id}}
                            </p>
                        </div>
                        <div class="col-12 order-3 order-lg-5">
                            <p class="my-0">
                                {{userInView.bio}}
                            </p>
                        </div>
                    </div>
                </div>
                
                <Publish :user="user" :userView="userInView" :usersList="usersList" :publish="publish" />
            </div>
            <div class="container" v-else>
                Usuario no encontrado
            </div>
        </div>
        <div v-else>
            <div class="preloader"></div>
            <div class="container fixed-bottom text-center mx-auto my-5 font-weight-bold">
                Cargando{{dots()}}
            </div>
        </div>
    </div>
</template>

<script>
import Publish from '@/components/Publish.vue'
const fb = require('@/firebase')
export default {
    name: 'Profile',
    props:['user', 'usersList', 'publish'],
    components:{
        Publish
    },
    data(){
        var userId = this.$route.params.userId
        return{
            dot: '.',
            userId,
            userInView:null,
            mobile: window.innerWidth<991
        }
    },
    methods:{
        followAction(userClick){
            var userTemp = this.user;
            var index = this.user.follows.indexOf(userClick);
            if(index!=-1){
                fb.usersCollection.doc(this.user.id).update({
                    follows: fb.fieldValue.arrayRemove(userClick)
                })
                fb.usersCollection.doc(userClick).update({
                    followers: fb.fieldValue.arrayRemove(this.user.id)
                })
                userTemp.follows.splice(index,1);
            }else{
                fb.usersCollection.doc(this.user.id).update({
                    follows: fb.fieldValue.arrayUnion(userClick)
                })
                fb.usersCollection.doc(userClick).update({
                    followers: fb.fieldValue.arrayUnion(this.user.id)
                })
                userTemp.follows.push(userClick);
            }
            this.$store.commit('setUser', userTemp);
        },
        getUser(userId){
            var temp = this.usersList.filter(function(el){
                return (el.id == userId)
            })      
            this.userInView = temp[0];
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
        },
        logOut() {
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                if(this.$route.name!='Home'){
                    this.$router.push({name:'Home'})
                }
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
.profileImg{
    margin-top: -100px;
    border-style: solid;
    border-color: #121212;
}
</style>