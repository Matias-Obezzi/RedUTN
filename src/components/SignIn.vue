<template>
    <div class="mx-auto text-center">
        <h3>Iniciar sesión</h3>
        <form action="#" @submit.prevent="login">
            <div class="form-group mx-auto">
                <label class="col-form-label mx-0 pb-0" for="email">Email</label>
                <input class="form-control" type="email" placeholder="ej: jdoe@est.frba.utn.edu.ar" v-model="form.email" id="email" autocomplete="off">
            </div>
            <div class="form-group mx-auto">
                <label class="col-form-label mx-0 pb-0" for="password">Contraseña</label>
                <input class="form-control" type="password" placeholder="Contraseña" v-model="form.password" id="password">
            </div>
            <div class="form-text text-danger m-3" v-if="error">
                {{error}}
            </div>
            <button type="submit" class="btn btn-success form-group px-3">Iniciar sesión</button>
            <!-- <p class="mb-0">Olvidaste la contraseña? <router-link to="Reset">Restablecela</router-link></p> -->
        </form>
    </div>
</template>

<script>
const fb = require('@/firebase')
export default {
  name: "Login",
  data(){
      return{
          form:{
            email: '',
            password: ''
          },
          error: null
      }
  },
  methods:{
      login(){
          if(this.form.email && this.form.password){
            var credential ={
                email: this.form.email,
                psw: this.form.password
            }
            fb.auth.signInWithEmailAndPassword(credential.email, credential.psw).then((user)=>{
                if(!user.user.emailVerified){
                    this.error = "Verifica tu email para iniciar sesión";
                    fb.auth.currentUser.sendEmailVerification();
                    fb.auth.signOut();
                }
            }).catch(error=>{
                if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                    this.error = "No existe una cuenta asociada a ese email. Su cuenta puede haber sido borrada";
                }else if(error.message === "The password is invalid or the user does not have a password."){
                    this.error = "Contraseña incorrecta"
                }else{
                    this.error = error.message;
                }
                console.log(error.message)
            })
        }else{
            this.error = "Todos los campos son requeridos"
        }
      }
  }
};
</script>

<style lang="scss">
</style>