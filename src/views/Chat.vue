<template>
    <div class="row mx-auto">
        <template v-if="$route.params.userId && !chatOnView">
            {{getChatOnView()}}
        </template>
        <ChatList class="col p-0" :chats="chats" :user="user" :usersList="usersList" />
        <ChatView class="col-9" v-if="chatOnView" :chat="chatOnView" :user="user" :usersList="usersList" :key="$route.params.userId + chatOnView" />
        <div class="col-9 mx-2 p-0" v-else>
            Inicia un chat con algún usuario
        </div>
    </div>
</template>

<script>
// const fb = require('@/firebase.js');
import ChatList from '@/components/ChatList.vue'
import ChatView from '@/components/ChatView.vue'
export default {
    name: 'Chat',
    props:['user', 'usersList', 'chats'],
    components:{
        ChatList,
        ChatView
    },
    data(){
        return{
            chatOnView: null
        }
    },
    watch:{
        '$route.params.chatId': function(chatId){
            chatId;
            this.getChatOnView();
        },
        chats(newVal, oldVal){
            if(newVal[0] && newVal.length !== oldVal.length){
                this.getChatOnView();
            }
        }
    },
    methods:{
        validateMembers(members){
            return members.every(member => this.usersList.some(user => user.id==member))
        },
        getChatOnView(){
            let chatId = this.$route.params.userId?this.$route.params.userId.split("-").concat(this.user.id):null;
            if(chatId && this.validateMembers(chatId)){
                let temp = null;
                let tempChat = {
                    members:chatId,
                    messages:[
                        {text:"aaaaa",author:"mobezzi"},
                        {text:"aaaaa",author:"mobezzi"},
                        {text:"aaaaa",author:"lcasemajor"},
                        {text:"aaaaa",author:"mobezzi"},
                        {text:"aaaaa",author:"mobezzi"},
                    ],
                    lastMessage: new Date(),
                    id: null
                }
                if(this.chats){
                    temp = this.chats.filter(el =>{
                        return chatId.every(user => el.members.includes(user)) && chatId.length == el.members.length;
                    })[0];
                }
                this.chatOnView = temp?temp:tempChat;
            }else{
                this.$router.push({name:'Chat'})
            }
        },
        formatTime(timeStamp){
            var today = new Date();
            var timeTemp = new Date(timeStamp * 1000);
            var diff = today.getTime() - timeTemp.getTime();
            if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
                return "Hace " + Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + " año(s)";
            } else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
                return "Hace " + Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + " mes(es)";
            } else if (diff / (1000 * 60 * 60 * 24) >= 1) {
                return  "Hace " + Math.round(diff / (1000 * 60 * 60 * 24)) + " dia(s)";
            } else if (diff / (1000 * 60 * 60) >= 1) {
                return  "Hace " + Math.round(diff / (1000 * 60 * 60 * 2)) + " hora(s)";
            } else if (diff / (1000 * 60) >= 1) {
                return  "Hace " + Math.round(diff / (1000 * 60)) + " minuto(s)";
            } else if (diff / 1000 >= 1) {
                return  "Hace " + Math.round(diff / 1000) + " segundo(s)";
            } else {
                return "Hace instantes";
            }
        }
    }
}
</script>