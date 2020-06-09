<template>
    <div>
        <template v-if="!usersShow && usersList">
            {{filterUsers()}}
        </template>
        <div class="col-12 col-lg-4">
            <div class="row mx-auto bg-light rounded-pill">
                <b-icon-at font-scale="1.25" class="my-auto ml-2 px-0"></b-icon-at>
                <input type="text" class="form-control rounded-pill pl-1 text-dark border-0 col px-0" v-model="input" v-on:input="filterUsers" placeholder="Usuario interno">
            </div>
        </div>
        <div class="container row row-cols-2 row-cols-lg-3 mx-auto my-1">
            <router-link :to="{name:'Profile', params:{userId:u.id}}" class="col p-1" v-for="u in usersShow" :key="u.id">
                <div class="rounded border-0" :class="u.color.all">
                    <div class="row no-gutters">
                        <div class="col-md-3 my-auto">
                            <img :src="u.avatar?u.avatar:'/favicon.png'" class="d-block mx-auto" style="height:50px; width:50px;">
                        </div>
                        <div class="col-md p-1">
                            <div class="card-body py-1 px-0 text-left">
                                <h5 class="card-title m-0">{{u.username}}</h5>
                                <p class="card-text">@{{u.id}}</p>
                            </div>
                            <div class="card-footer border-0 bg-transparent row mx-auto p-0">
                                <div class="col px-0">
                                    <i class="fas fa-users" data-toggle="tooltip" data-placement="right" title="Seguidores"></i> {{u.followers?u.followers.length:0}}
                                </div>
                                <div class="col px-0">
                                    <i class="fas fa-user" data-toggle="tooltip" data-placement="right" title="Seguidos"></i> {{u.follows?u.follows.length:0}}
                                </div>
                                <div class="col px-0" v-if="u.role!='user'">
                                    <i class="fas fa-check-circle mx-2 align-middle" v-if="u.role=='coadmin'" data-toggle="tooltip" data-placement="right" title="Coadmin"></i>
                                    <i class="fas fa-user-astronaut mx-2 align-middle" v-if="u.role=='admin'" data-toggle="tooltip" data-placement="right" title="Admin"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="col-12 text-light my-auto" v-if="usersShow.length==0 && input">
                Verifica el usuario interno ingresado.
                <br>
                Es una lastima no poder encontrar lo que estas buscando 😭
                
            </div>
            <div class="col-12 text-light my-auto" v-else-if="usersShow.length==0 && !input">
                Realizá una busqueda y veamos que aparece 😁
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'Search',
    props:['usersList','user'],
    mounted(){
    },
    data(){
        return{
            input:"",
            usersShow: null
        }
    },
    methods:{
        filterUsers(){
            var search = this.input
            var user = this.user
            if(user){
                this.usersShow = search?this.usersList.filter(el=> (search && el.id.indexOf(search)!=-1)):this.usersList.filter(el=> el.followers && el.followers.indexOf(user.id)!=-1)
            }else{
                this.usersShow=this.usersList
            }
            this.setToolTip();
        },
        setToolTip(){ 
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    }
}
</script>

<style scoped>
input:focus {
    box-shadow: none;
}
a:hover{
    text-decoration: none;
}
</style>