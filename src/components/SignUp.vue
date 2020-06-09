<template>
    <div class="mx-auto text-center">
        <h3>Crear cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="signUp">
          <div class="form-group mx-auto">
            <label class="col-form-label" for="user">Usuario</label>
            <div class="form-group">
              <input
                class="form-control"
                type="name"
                placeholder="ej: jdoe420"
                v-model="user"
                id="user"
                v-on:input="nameVal(user)"
                :class="{'is-valid' : !errorName && stateName && user, 'is-invalid' : errorName && stateName && user}"
              />
              <div
                class="invalid-tooltip"
                v-if="errorName && user"
              >{{this.stateName}}</div>
            </div>
            <small
              class="col-12 my-0 form-text text-muted"
            >Minimo seis caracteres y no puede contener caracteres especiales</small>
          </div>
          <hr class="w-75" />
          <div class="form-group mx-auto">
            <label class="col-form-label" for="email">Email</label>
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                placeholder="ej: jdoe@est.frba.utn.edu.ar"
                v-model="email"
                id="email"
                v-on:input="mailVal(email)"
                :class="{'is-valid' : !errorMail && stateMail && email, 'is-invalid' : errorMail && stateMail && email}"
              />
              <div
                class="invalid-tooltip"
                v-if="errorMail"
              >{{this.stateMail}}</div>
            </div>
            <small
              class="col-12 my-0 form-text text-muted"
            >Solo emails institucionales finalizados en utn.edu.ar</small>
          </div>
          <hr class="w-75" />
          <div class="form-group mx-auto">
            <label class="col-form-label" for="password">Contraseña</label>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                v-model="password"
                id="password"
                v-on:input="passVal(password)"
                :class="{'is-valid' : !errorPass && statePass && password, 'is-invalid' : errorPass && statePass && password}"
              />
              <div
                class="invalid-tooltip"
                v-if="errorPass"
              >{{this.statePass}}</div>
            </div>
            <small
              class="col-12 my-0 form-text text-muted"
            >Mínimo seis caracteres entre ellos una mayuscula, una minuscula y un número</small>
          </div>
          <hr />
          <div class="form-group">
            <div class v-if="state" :class="{'text-danger' : error, 'text-success' : !error}">
              {{this.state}}
            </div>
          </div>
          <button type="submit" class="btn btn-success form-group">Registrar</button>
        </form>
    </div>
</template>

<script>
const fb = require('@/firebase')

export default {
    name: "SignUp",
    data() {
        return {
        user: "",
        email: "",
        password: "",
        errorName: null,
        stateName: "",
        errorMail: null,
        stateMail: "",
        errorPass: null,
        statePass: "",
        error: null,
        state: ""
        }
    },
    methods: {
        nameVal(name) {
        const specialCharacterRegex = new RegExp("^(?=.*[!@#$%^&*])");
        if (specialCharacterRegex.test(name) || name.indexOf(" ") >= 0) {
            this.errorName = true;
            this.stateName = "No puede contener caracteres especiales o espacios";
            return false;
        } else if (name.length < 6) {
            this.errorName = true;
            this.stateName = "Muy corto";
            return false;
        } else {
            this.stateName = " ";
            this.errorName = false;
            return true;
        }
        },
        passVal(passTest) {
        //   const lowerCaseRegex = new RegExp("^(?=.*[a-z])");
        //   const upperCaseRegex = new RegExp("^(?=.*[A-Z])");
        //   const numericRegex = new RegExp("^(?=.*[0-9])");

        //   if (!lowerCaseRegex.test(passTest)) {
        //     this.errorPass = true;
        //     this.statePass = "Un caracter minuscula mínimo";
        //     return false;
        //   } else if (!upperCaseRegex.test(passTest)) {
        //     this.errorPass = true;
        //     this.statePass = "Un caracter mayuscula mínimo";
        //     return false;
        //   } else if (!numericRegex.test(passTest)) {
        //     this.errorPass = true;
        //     this.statePass = "Un número mínimo";
        //     return false;
        //   } else 
        if (passTest.length < 6) {
            this.errorPass = true;
            this.statePass = "Seis caracteres mínimo";
            return false;
        } else {
            this.errorPass = false;
            this.state = " ";
            return true;
        }
        },
        mailVal(mail) {
        if (mail.includes("@")) {
            if (mail.endsWith("utn.edu.ar")) {
            this.errorMail = false;
            this.stateMail = " ";
            return true;
            } else {
            this.errorMail = true;
            this.stateMail = "El email no pertenece a la UTN";
            return false;
            }
        } else {
            this.errorMail = true;
            this.stateMail = "El formato del email es incorrecto";
        }
        },
        signUp() {
            if (this.user && this.email && this.password) {
                var name = this.nameVal(this.user);
                var utnMail = this.mailVal(this.email);
                var pass = this.passVal(this.password);
                if (utnMail && pass && name) {
                    var user = {
                        // uid: doc.uid,
                        id: this.email.split('@')[0],
                        username: this.user,
                        email: this.email,
                        role: "user",
                        time: new Date(),
                        likes: 0,
                        pubCount: 0,
                        avatar: null,
                        bio: null
                    }
                    fb
                    .auth
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(userFir => {
                        userFir.user.updateProfile({
                            displayName: this.email.split('@')[0]
                        });
                        // this.$store.commit('setCurrentUser', userFir.user)
                        fb.currentUser.sendEmailVerification();
                        fb.auth.signOut;
                        fb.usersCollection.doc(this.email.split('@')[0]).set(user)
                        // .then(() => {
                        //     this.$store.dispatch('fetchFbProfile')
                        //     this.$router.push({name:'Home'})
                        // }).catch(err => {
                        //     console.log(err)
                        // });
                        this.error = false;
                        this.state = "Email de verificación enviado, verifica tu email para iniciar sesión";
                    })
                    .catch(error => {
                    this.error = true;
                    if (error.message === "The email address is already in use by another account.") {
                        this.state = "El email ya esta en uso con otra cuenta";
                    } else if (error.message === "Password should be at least 6 characters") {
                        this.state = "La contraseña debe contener mínimo 6 caracteres";
                    } else {
                        this.state = error.message;
                    }
                    });
                } else {
                    this.error = true;
                    this.state = "Todos los campos son requeridos";
                }
            }
        }
    }
}
</script>

<style>
</style>