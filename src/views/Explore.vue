<template>
    <div> 
        <Publish class="pt-3" :usersList="usersList" :user="user" :publish="publish" :isExplore="true" />
    </div>
</template>

<script>
import Publish from '@/components/Publish.vue'
export default {
    name: "Explore",
    props: ['user', 'usersList', 'publish'],
    components:{
        Publish
    }
}
</script>