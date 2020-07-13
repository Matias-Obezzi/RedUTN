<template>
    <div class="container mx-auto">
        <Publish :usersList="usersList" :user="user" :publish="publish" />
    </div>
</template>

<script>
import Publish from '@/components/Publish.vue'
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
    },
    methods:{
        
    }
}
</script>