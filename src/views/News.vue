<template>
  <div class="mt-4">
    <hr class="bg-light w-50">
    <p class="text-light font-weight-bold">Proximamente aparaceran notificaciones acá 😁</p>
    <hr class="bg-light w-50">
    <div v-if="news">
      <div class="alert alert-dismissible fade show text-light text-left" role="alert">
        <strong  class="text-uppercase">Hola {{user?user.username:""}}!</strong>
        <!-- <button v-if="user" type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="saw()">
          <span aria-hidden="true">&times;</span>
        </button> -->
        <p>Estas son las novedades de la app:</p>
        <div class="p-2 pl-2 border-left border-light" v-for="(n, index) in news.messages" :key="index">
          <p><strong>{{index+1}}- {{n.title}}</strong></p>
          <p>{{n.content}}</p>
        </div>
      </div>
    </div>
    <div v-if="user && user.role=='admin'">
      <div class="card btn" v-if="!createPin" @click.prevent="createPin=true">Añadir novedades</div>
      <div class="card" v-if="createPin" :class="{'bg-dark border-light text-light': dark, 'bg-light border-dark text-dark': !dark}">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="createPin=false">
          <span aria-hidden="true">&times;</span>
        </button>
        <p class="text-center mt-2"><strong>Añadir novedades</strong></p>
        <div class="m-2" v-for="(novedad,index) in novedades" :key="index">
          <div class="row container">
            <p class="col my-auto text-center"><strong>{{index}}</strong></p>
            <p class="col-lg-4 my-auto text-center">{{novedad.title}}</p>
            <p class="col-lg-7 my-auto text-center">{{novedad.content}}</p>
          </div>
        </div>
        <div class="m-2">
          <div class="row container mx-auto">
            <p class="col my-auto text-center"><strong>{{novedades.length}}</strong></p>
            <textarea
              class="form-control text-center col-lg-4 m-1"
              aria-label="With textarea"
              placeholder="Titulo"
              v-model="nov.title"
              :class="{'is-invalid': nov.title && nov.title.length == 0 , 'is-valid': nov.title && nov.title.length != 0, 'bg-dark border-light text-light': dark, 'bg-light border-dark text-dark': !dark}"
            ></textarea>
            <textarea
              class="form-control col-lg-7 m-1"
              aria-label="With textarea"
              placeholder="Contenido"
              v-model="nov.content"
              :class="{'is-invalid': nov.content && nov.content.length == 0 , 'is-valid': nov.content && nov.content.length != 0, 'bg-dark text-light': dark, 'bg-light text-dark': !dark}"
            ></textarea>
          </div>
        </div>
        <div class="row container justify-content-center mx-auto ">
          <button @click.prevent="addNew" class="btn btn-success my-3 mx-4 col-lg-5">Añadir novedad</button>
          <button @click.prevent="publishPin" class="btn btn-warning my-3 mx-4 col-lg-5">Publicar novedad</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require('@/firebase')
export default {
    name:'News',
    props: ['user', 'news'],
    data(){
        return{
            newPin: '',
            novedades:[],
            createPin: false,
            nov:{
                title: '',
                content: ''
            }
        }
    },
    methods: {
        addNew(){
        if(this.nov.title.trim().length > 0 && this.nov.content.trim().length > 0){
            this.novedades.push({
            title: this.nov.title,
            content: this.nov.content
            })
            this.nov.title = null
            this.nov.content = null
        }
        },
        publishPin() {
        if (this.novedades.length>0 && confirm("Desea publicar las novedades cargadas?")) {
            var data = {
            messages: this.novedades,
            timePin: new Date(),
            saw: []
            };
            fb
                .publishCollection
                .doc("admin-pin")
                .set(data);
            }
        },
        formatTime(timeStamp) {
        var today = new Date();
        var timeTemp = new Date(timeStamp * 1000);
        var diff = today.getTime() - timeTemp.getTime();
        if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
            return (
            "Hace " +
            Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) +
            " año(s)"
            );
        } else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
            return (
            "Hace " + Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + " mes(es)"
            );
        } else if (diff / (1000 * 60 * 60 * 24) >= 1) {
            return "Hace " + Math.round(diff / (1000 * 60 * 60 * 24)) + " dia(s)";
        } else if (diff / (1000 * 60 * 60) >= 1) {
            return "Hace " + Math.round(diff / (1000 * 60 * 60 * 2)) + " hora(s)";
        } else if (diff / (1000 * 60) >= 1) {
            return "Hace " + Math.round(diff / (1000 * 60)) + " minuto(s)";
        } else if (diff / 1000 >= 1) {
            return "Hace " + Math.round(diff / 1000) + " segundo(s)";
        } else {
            return "Hace instantes";
        }
        },
        saw() {
        var userId = this.user.id;
        fb
            .publishCollection
            .doc("admin-pin")
            .update({
            saw: fb.fieldValue.arrayUnion(userId)
            });
        }
    }
}
</script>