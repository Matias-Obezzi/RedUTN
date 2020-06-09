<template>
    <div class="container mx-auto">
        <CreatePublish :user="user" v-if="user" />
        <Publish class="pt-3" :usersList="usersList" :user="user" :publish="publish" />
    </div>
</template>

<script>
import Publish from '@/components/Publish.vue'
import CreatePublish from '@/components/CreatePublish.vue'
export default {
    name: 'Home',
    props: ['user', 'usersList', 'publish'],
    data(){
        return{
            signIn:true
        }
    },
    components:{
        Publish,
        CreatePublish,
    },
    methods:{
        
    }
}
</script>