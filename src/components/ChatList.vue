<template>
    <div>
        <template v-if="chats">
            <div v-for="chat in chats" :key="chat.members">
                {{chat.title?chat.title:chat.members}}
            </div>
        </template>
        <template v-else>
            <router-link class="link" v-for="user in follows" :key="user.id" :to="{name:'ChatView', params:{userId:user.id}}">
                <div class="bg-light text-dark p-2 my-1 row mx-auto rounded-pill">
                    <div class="col-2 p-0">
                        <img :src="user.avatar?dots+user.avatar:'/favicon.png'" class="img-fluid rounded-circle">
                    </div>
                    <div class="col p-0">
                        {{user.username}}
                        <div class="row mx-auto">
                            <div class="col small">
                                @{{user.id}}
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </template>

    </div>
</template>

<script>
export default {
    name: 'ChatList',
    props:['chats', 'user', 'usersList'],
    data(){
        let count = this.$route.fullPath.split("/").length-2;
        let dots = "";
        for(var i = 0; i<count; i++){
            dots+="../";
        }
        return {
            dots,
            follows:this.userFollows()
        }
    },
    methods:{
        userFollows(){
            return this.usersList.filter(el=>{
                return this.user.follows?this.user.follows.indexOf(el.id)!=-1:false;
            })
        },
        getUser(userToFind){
            var temp = this.usersList.filter(el => {
                return el.id == userToFind
            })
            return temp[0]
        },
    }
}
</script>

<style>
    .link:hover{
        text-decoration: none;
    }
</style>