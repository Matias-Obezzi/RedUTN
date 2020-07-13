<template>
    <div class="sticky-top">
        <div class="d-block d-lg-none">
            <div class="fixed-bottom row col-12 mx-auto px-0 bg-black">
                <router-link class="col text-light lead text-center py-2" :class="{'active':$route.name=='Home'}" :to="{name:'Home'}">
                    <b-icon icon="house" class="mb-1"></b-icon>
                </router-link>
                <router-link class="col text-light lead text-center py-2" :class="{'active':$route.name=='Search' || ($route.name=='Profile' && user && $route.params.userId != user.id)}" :to="{name:'Search'}">
                    <b-icon icon="search" class="mb-1"></b-icon>
                </router-link>
                <router-link class="col text-light lead text-center py-2" :class="{'active':$route.name=='News'}" :to="{name:'News'}">
                    <b-icon icon="newspaper" class="mb-1"></b-icon>
                </router-link>
                <router-link class="col text-light lead text-center py-2" :class="{'active':$route.name=='Profile' && $route.params.userId==user.id}" v-if="user" :to="{name:'Profile', params:{userId:user.id}}">
                    <div class="mb-2">
                        <img class="align-middle rounded-circle d-block mx-auto bg-dark" :src="user.avatar?dots+user.avatar:'/favicon.png'" height="30">
                    </div>
                </router-link>
                <div @click="signIn=!signIn" class="col text-light lead text-center py-2" :class="{'active':signIn || signUp}" v-else>
                    <b-icon class="mb-1" icon="person"></b-icon>
                </div>
            </div>
        </div>
        <div class="d-none d-lg-block pt-2 bg-black sticky-top navbar-dark" style="height:100vh">
            <div class="text-left rounded-pill px-0">
                <router-link class="navbar-brand align-middle rounded-pill" :to="{name:'Home'}">
                    <img src="/favicon.png" height="50" class="mx-2 d-inline-block my-auto rounded-circle">
                    <p class="d-inline-block my-auto pr-3 align-middle" >Red - UTN</p>
                </router-link>
            </div>
            <div class="text-left text-light my-2">
                <router-link class="nav-item nav-link text-light lead font-weight-bold" :class="{'active-desk':$route.name=='Home'}" :to="{name:'Home'}"><b-icon icon="house" class="mb-1"></b-icon> Inicio</router-link>
                <router-link class="nav-item nav-link text-light lead font-weight-bold" :class="{'active-desk':$route.name=='Search' || ($route.name=='Profile' && user && $route.params.userId != user.id)}" :to="{name:'Search'}">
                    <b-icon icon="search" class="mb-1"></b-icon> Buscar
                </router-link>
                <router-link class="nav-item nav-link text-light lead font-weight-bold" :class="{'active-desk':$route.name=='Chat' || $route.name=='ChatView'}" :to="{name:'Chat'}">
                    <b-icon icon="chat" class="mb-1"></b-icon> 
                    Chat
                </router-link>
                <router-link class="nav-item nav-link text-light lead font-weight-bold" :class="{'active-desk':$route.name=='News'}" :to="{name:'News'}">
                    <b-icon icon="newspaper" class="mb-1"></b-icon> 
                    Novedades
                </router-link>
            </div>
            <div class="fixed-bottom-nav col-2 px-0 text-center mx-auto justify-content-center">
                <template v-if="user">
                    <div class="dropdown">
                        <b-button pill variant="transparent" class="p-0 text-light active border" id="user-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="row mx-auto p-0">
                                <img class="my-auto bg-dark rounded-circle" :src="user.avatar?dots+user.avatar:'/favicon.png'" alt="" height="50">
                                <div class="col ml-1 mr-auto pr-3 pl-0 text-left my-auto align-middle font-weight-bold">
                                    <p class="m-0 p-0">{{user.username}}</p>
                                    <small class="font-italic">@{{user.id}}</small>
                                </div>
                                <i class="fas fa-chevron-up my-auto pr-3"></i>
                            </div>
                        </b-button>
                        <div class="dropdown-menu active border text-light my-2 py-0" aria-labelledby="user-menu">
                            <router-link :to="{name:'Profile', params:{userId:user.id}}" class="dropdown-item rounded-top">
                                {{user.username}}
                            </router-link>
                            <button class="dropdown-item rounded-bottom" @click="logOut()">Cerrar sesión</button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <button class="btn btn-success rounded-pill" @click="signIn=!signIn">Iniciar sesión</button>
                </template>
                <router-link class="nav-item nav-link text-light mx-auto" :to="{name:'About'}"> Información de RedUTN</router-link>
            </div>
        </div>
        <b-modal hide-footer v-model="signIn" v-if="!user">
            <SignIn />
            <button class="btn d-block mx-auto" @click="signUp = true; signIn=false;">No tenes cuenta? crea una acá</button>
        </b-modal>
        <b-modal hide-footer v-model="signUp" v-if="!user">
            <SignUp />
            <button class="btn d-block mx-auto" @click="signUp = false; signIn=true;">Ya tenes cuenta? Inicia sesión acá</button>
        </b-modal>
    </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
const fb = require('@/firebase')
export default {
    name: 'Navigation',
    props: ['user', 'usersList'],
    data(){
        let count = this.$route.fullPath.split("/").length-2;
        let dots = "";
        for(var i = 0; i<count; i++){
            dots+="../";
        }
        return{
            dots,
            userToFind: '',
            bgNav: false,
            openNav: false,
            signIn:false,
            signUp:false,
            mobile: window.innerWidth<991
        }
    },
    components:{
        SignIn,
        SignUp
    },
    created(){
        window.addEventListener('scroll', this.navAction);
    },
    methods:{
        navAction(event){
            this.bgNav = event.target.scrollingElement.scrollTop>5
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
        findUser(){
            if(this.userToFind.length==0 && this.$route.name!='Home'){
                this.$router.push({name:'Home'})
            }else{
                this.$router.push({name:'Profile', params:{userId: this.userToFind}})
            }
        }
    }
}
</script>

<style scoped>
*:hover{
    text-decoration: none;
}
.active{
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: 1px;
    background: rgba(255,255,255,0.1);
    /* background: linear-gradient(to top ,rgba(255,255,255,0.1) 0%, rgba(255, 255, 255, 0) 100%) */
}
.active-desk{
    border-left-style: solid;
    border-left-color: white;
    border-left-width: 1px;
    background: rgba(255,255,255,0.1);
}
.dropdown-item{
    color: antiquewhite;
}
.dropdown-item:hover{
    color:black
}
.fixed-bottom-nav{
    position: fixed;
    bottom:0;
}
.navbar{
    transition: 0.25s;
}
</style>