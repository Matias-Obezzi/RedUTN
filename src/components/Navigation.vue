<template>
    <div class="sticky-top">
        <div class="d-block d-lg-none">
            <div class="fixed-bottom row col-12 mx-auto py-2 bg-black">
                <router-link class="col text-light lead text-center" :to="{name:'Home'}">
                    <b-icon icon="house" class="mb-1" v-if="$route.name!='Home'"></b-icon>
                    <b-icon icon="house-fill" class="mb-1" v-else></b-icon>
                </router-link>
                <router-link class="col text-light lead text-center" :to="{name:'Search'}">
                    <b-icon icon="search" class="mb-1" v-if="$route.name!='Search'"></b-icon>
                    <b-iconstack class="mb-1" v-else>
                        <b-icon stacked icon="search" class="mb-1"></b-icon>
                        <b-icon icon="circle-fill" shift-v="-1" shift-h="1" font-scale="0.6"></b-icon>
                    </b-iconstack>
                </router-link>
                <router-link class="col text-light lead text-center" :to="{name:'Explore'}">
                    <b-icon icon="layout-wtf" class="mb-1" v-if="$route.name!='Explore'"></b-icon>
                    <svg v-else style="margin-top:-2px; margin-bottom:2px" data-v-81440b78="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 11 11" width="25" height="25"><defs data-v-81440b78=""><path data-v-81440b78="" d="M1.56 1.56L1.56 6.06L3.81 6.06L3.81 1.56L1.56 1.56ZM1 1.56C1 2.01 1 5.61 1 6.06C1 6.37 1.25 6.63 1.56 6.63C1.79 6.63 3.59 6.63 3.81 6.63C4.12 6.63 4.38 6.37 4.38 6.06C4.38 5.61 4.38 2.01 4.38 1.56C4.38 1.25 4.12 1 3.81 1C3.66 1 2.91 1 1.56 1C1.19 1.17 1 1.36 1 1.56ZM6.06 2.13L6.06 4.94L8.88 4.94L8.88 2.13L6.06 2.13ZM5.5 2.13C5.5 2.41 5.5 4.66 5.5 4.94C5.5 5.25 5.75 5.5 6.06 5.5C6.34 5.5 8.59 5.5 8.88 5.5C9.19 5.5 9.44 5.25 9.44 4.94C9.44 4.66 9.44 2.41 9.44 2.13C9.44 1.81 9.19 1.56 8.88 1.56C8.69 1.56 7.75 1.56 6.06 1.56C5.69 1.73 5.5 1.92 5.5 2.13ZM2.69 8.31L2.69 9.44L3.81 9.44L3.81 8.31L2.69 8.31ZM2.13 8.31C2.13 8.43 2.13 9.32 2.13 9.44C2.13 9.75 2.38 10 2.69 10C2.8 10 3.7 10 3.81 10C4.12 10 4.38 9.75 4.38 9.44C4.38 9.32 4.38 8.43 4.38 8.31C4.38 8 4.12 7.75 3.81 7.75C3.74 7.75 3.36 7.75 2.69 7.75C2.31 7.92 2.13 8.11 2.13 8.31ZM6.06 7.19L6.06 8.31L9.44 8.31L9.44 7.19L6.06 7.19ZM5.5 7.19C5.5 7.3 5.5 8.2 5.5 8.31C5.5 8.62 5.75 8.88 6.06 8.88C6.4 8.88 9.1 8.88 9.44 8.88C9.75 8.88 10 8.62 10 8.31C10 8.2 10 7.3 10 7.19C10 6.88 9.75 6.63 9.44 6.63C9.21 6.62 8.09 6.62 6.06 6.63C5.69 6.79 5.5 6.98 5.5 7.19Z" id="a2RubfyHJ0"></path></defs><g data-v-81440b78=""><g data-v-81440b78=""><g data-v-81440b78=""><use data-v-81440b78="" xlink:href="#a2RubfyHJ0" opacity="100" fill="#ffffff" fill-opacity="100"></use></g></g></g></svg>
                </router-link>
                <router-link class="col text-light lead text-center" v-if="user" :to="{name:'Profile', params:{userId:user.id}}">
                    <img class="my-auto rounded-circle d-block mx-auto" :class="{'border border-light bg-light': $route.params.userId==user.id, 'bg-dark': $route.params.userId!=user.id}" :src="user.avatar?user.avatar:'/favicon.png'" alt="" height="30">
                </router-link>
                <div @click="signIn=!signIn" class="col text-light lead text-center" v-else>
                    <b-icon class="mb-1" icon="person" v-if="!signIn && !signUp"></b-icon>
                    <b-icon class="mb-1" icon="person-fill" v-if="signIn || signUp"></b-icon>
                </div>
            </div>
        </div>
        <div class="d-none d-lg-block p-2 bg-black sticky-top navbar-dark" style="height:100vh">
            <div class="text-left rounded-pill px-0">
                <router-link class="navbar-brand align-middle rounded-pill" :to="{name:'Home'}">
                    <img src="/favicon.png" height="50" class="mx-2 d-inline-block my-auto rounded-circle">
                    <p class="d-inline-block my-auto pr-3 align-middle" >Red - UTN</p>
                </router-link>
            </div>
            <div class="text-left text-light my-2">
                <router-link class="nav-item nav-link text-light lead" :to="{name:'Home'}"><b-icon icon="house" class="mb-1"></b-icon> Inicio</router-link>
                <router-link class="nav-item nav-link text-light lead" :to="{name:'Search'}"><b-icon icon="search" class="mb-1"></b-icon> Buscar</router-link>
                <router-link class="nav-item nav-link text-light lead" :to="{name:'Explore'}"><b-icon icon="layout-wtf" class="mb-1"></b-icon> Explorar</router-link>
                <router-link class="nav-item nav-link text-light lead" :to="{name:'News'}"><b-icon icon="newspaper" class="mb-1"></b-icon> Novedades</router-link>
            </div>
            <div class="fixed-bottom-nav text-center">
                <template v-if="user">
                    <div class="dropdown">
                        <b-button pill variant="outline-light" class="p-0 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="row mx-auto p-0">
                                <img class="my-auto bg-dark rounded-circle" :src="user.avatar?user.avatar:'/favicon.png'" alt="" height="50">
                                <div class="col ml-1 mr-auto pr-3 pl-0 text-left my-auto align-middle">
                                    <p class="m-0 p-0">{{user.username}}</p>
                                    <small class="font-italic">@{{user.id}}</small>
                                </div>
                                <i class="fas fa-chevron-up my-auto pr-3"></i>
                            </div>
                        </b-button>
                        <div class="dropdown-menu bg-dark text-light my-2 py-0" aria-labelledby="dropdownMenuButton">
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
                <router-link class="nav-item nav-link text-light" :to="{name:'About'}"> Información de RedUTN</router-link>
            </div>
        </div>
        <b-modal hide-footer v-model="signIn">
            <SignIn />
            <button class="btn d-block mx-auto" @click="signUp = true; signIn=false;">No tenes cuenta? crea una acá</button>
        </b-modal>
        <b-modal hide-footer v-model="signUp" >
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
        return{
            userToFind: '',
            bgNav: false,
            openNav: false,
            signIn:false,
            signUp:false
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