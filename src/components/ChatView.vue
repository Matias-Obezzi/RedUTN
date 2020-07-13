<template>
    <div class="my-1 border p-0 mx-2 chat">
        <div class="bg-light py-2 rounded-pill">
            <div v-if="group">
                <div class="p-0 m-0 d-inline-block" v-for="(member, index) in chat.members" :key="member">
                    <router-link class="link text-dark" :to="{name:'Profile', params:{userId:member}}">
                        {{member}}
                    </router-link>
                    <div class="d-inline-block my-0 mx-2" v-if="index < chat.members.length-1">
                        -
                    </div>
                </div>
            </div>
            <div class="text-left" v-else> 
                <router-link :to="{name:'Profile', params:{userId:userChat.id}}" class="mr-auto text-left align-middle my-auto text-dark link">
                    <img :src="userChat.avatar?dots+userChat.avatar:'/favicon.png'" class="img-fluid col-1 rounded-circle">
                    <p class="d-inline-block my-0 align-middle mr-auto">
                        {{userChat.username}}
                    </p>
                </router-link>
            </div>
        </div>
        <div class="container">
            <div class="col-6 bg-light rounded-pill my-2" :class="{'ml-auto':mes.author==user.id}" v-for="(mes,index) in chat.messages" :key="index">
                {{mes.text}}
            </div>
        </div>
        <div class="container bg-light rounded-pill">
            <input type="text">
        </div>
    </div>
</template>

<script>
export default {
    name:'ChatOnView',
    props:['user', 'chat', 'usersList'],
    data(){
        let count = this.$route.fullPath.split("/").length-2;
        let dots = "";
        for(var i = 0; i<count; i++){
            dots+="../";
        }
        return {
            dots,
            userChat: this.getUserChat(),
            group: this.chat.members.length>2
        }
    },
    methods:{
        getUserChat(){
            let membersWithoutUser =  this.chat.members;
            membersWithoutUser.splice(this.chat.members.indexOf(this.user.id),1);
            let user = this.getUser(membersWithoutUser[0]);
            this.chat.members.push(this.user.id);
            return user;
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

<style scoped>
    .chat{
        border-radius: 1.9rem;
    }
</style>