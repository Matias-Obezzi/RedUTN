<template>
    <div class="container mx-auto row">
        <div class="pt-3 col-12 col-md-10 col-md-10 col-lg px-2 mx-auto px-0">
            <div class="input-group">
                <textarea class="form-control" style="height: auto; max-height: auto" aria-label="Nueva publicación" v-on:input="valInput()" v-model="input"></textarea>
                <div class="input-group-append">
                    <button class="btn" :class="{'btn-success':!error && input, 'btn-danger':error}" type="button" @click="createPublish()">Publicar</button>
                </div>
            </div>
            <div class="char-count">
                <small>{{input?input.trim().length:0}}/200</small>
            </div>
            <!-- <div class="input-group text-left row col-12 px-0 mx-auto">
                <button class="btn text-light mb-auto">
                    <b-icon icon="emoji-smile" font-scale="1.1"></b-icon>
                </button>
                <button class="btn mb-auto" :class="{'text-success':imgPub.length>0, 'text-light':imgPub.length==0 }" @click="img || imgPub.length>0?linkImg=linkImg:linkImg=!linkImg">
                    <b-icon icon="paperclip" font-scale="1.1"></b-icon>
                </button>
                <div class="col-10 row px-0 mx-0" v-if="linkImg || img">
                    <div class="col-12 col-md px-0 input-group mb-0">
                        <input v-on:input="valImg()" placeholder="Url de la imagen" class="form-control rounded-0" :class="{'is-valid':!errorImg && img, 'is-invalid':errorImg && img}" aria-label="Nueva publicación" v-model="img">
                        <div class="input-group-append">
                            <button class="btn" type="button" @click="addImgPub()" :class="{'btn-success':img && !errorImg, 'btn.danger': !img || errorImg}">
                                <b-icon icon="plus"></b-icon>
                            </button>
                        </div>
                        <img :src="img" class="img-fluid" v-if="img && !errorImg" height="38">
                    </div>
                </div>
            </div> -->
            <div class="card-columns">
                <div class="card bg-transparent border-light" v-for="(i,index) in imgPub" :key="index">
                    <img :src="i" class="card-img-top" height="38">
                    <button class="btn" v-on:click="delImg(index)">
                        <b-icon icon="trash"></b-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const fb = require('@/firebase')
export default {
    name: 'CreatePublish',
    props:['user'],
    data(){
        return{
            input:'',
            img:'',
            imgPub: [],
            linkImg: false,
            error: true,
            errorImg: true,
        }
    },
    methods:{
        delImg(index){
            this.imgPub.splice(index,1)
        },
        addImgPub(){
            if(!this.errorImg){
                this.imgPub.push(this.img)
                this.img = ''
                this.error = true
            }
        },
        lSpaces(str){
            if(!str) return str;
            return str.replace(/^\s+/g, '');
        },
        rSpaces(str) {
            if(!str) return str;
            return str.replace(/\s+$/g, '');
        },
        valInput(){
            var temp = this.input = this.input.split("  ").join(" ");
            temp = temp.trim().split("  ").join(" ");
            this.error = !(temp && temp.length>0);
        },
        valImg(){
            this.errorImg = !(this.img && this.img.split('.')[0].length>0 && this.imgPub.indexOf(this.img)==-1  && (this.img.endsWith(".jpg") || this.img.endsWith(".png") || this.img.endsWith(".gif")))
        },
        createPublish(){
            if(!this.error){
                var data = {
                    author: this.user.id,
                    message: this.lSpaces(this.rSpaces(this.input)),
                    time: new Date(),
                    like: [],
                    comments: []
                };
                fb
                .publishCollection
                .add(data)
                .then(() =>{
                }).catch(err=>{
                    this.error=true;
                    console.log(err.message)
                });
                fb
                .usersCollection
                .doc(this.user.id)
                .update({
                    pubCount: fb.fieldValue.increment(1)
                })
                if(!this.error){
                    this.$store.dispatch('setPublish');
                    this.$emit("reload");
                    this.input="";
                    this.error=true;
                }
            }
        },
    }
}
</script>

<style scoped>
.char-count{
    position: relative;
    margin-top: -1.25em;
    text-align: end;
    margin-right: 6em;
    z-index: 9999;
}
</style>