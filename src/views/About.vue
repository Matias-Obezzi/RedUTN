<template>
    <div class="text-light container my-auto align-middle" style="100vh">
        <h4 class="my-0">RedUTN</h4>
        <p class="mt-0">Una app hecha por extudiantes para estudiantes</p>
        <div class="row container mx-auto">
            <div class="col-lg col-12">
                <img src='https://miro.medium.com/max/800/1*SwsnsLUP89B8eLmsY1OJQw.jpeg' class="img-fluid rounded" style="height:50vh" >
            </div>
            <div class="col-lg col-12 text-left my-auto">
                <p class="my-1">
                    En 2019 quería hacer algún proyecto para aprender VueJS y surgió la idea de hacer RedUTN
                </p>
                <p class="my-1">
                    Una app de acceso publico pero exclusivo a alumnos de la UTN-FRBA
                </p>
                <p class="my-1">
                    Realizada con VueJS, Bootstrap y Firebase logrando una app fluida, responsive y escalable.
                </p>
                <p class="my-1">
                    Utilizando Firebase Hosting para publicar la web y Firesbase Firestore como base de datos para almacenar todo,
                    logra cargar la base de datos en un tiempo considerable y mostrar todo en segundos.
                </p>
                <p class="my-1">
                    Con la ayuda de Bootstrap 4.5 consigue ser responsive para cualquier dispositivos.
                </p>
                <p class="my-1">
                    Con VueJS obetenemos una Single-Page Application que además es una Progresive Web App
                </p>
            </div>
        </div>
        <div class="container my-4 row mx-auto">
            <div class="col-lg col-6 order-1 order-lg-1 d-block mx-auto">
                <img src="/img/admin.svg" class="rounded-circle mx-2" style="max-width:170;" :class="user.color.bg">
            </div>
            <div class="col col-lg-4 my-auto order-3 order-lg-2">
                Soy un joven de 19 años, que estudia Ingeniería en Sistemas de Información en la UTN - FRBA
                <br>    
                <router-link class="text-light mx-2" :to="{name:'Profile', params:{userId:'mobezzi'}}"><i class="fas fa-user"></i></router-link>
                <a class="text-light mx-2" href="https://github.com/Matias-Obezzi" target="_blank"><i class="fab fa-github"></i></a>
                <a class="text-light mx-2" href="https://matias-obezzi.github.io" target="_blank"><i class="fas fa-globe"></i></a>
                <a class="text-light mx-2" href="https://www.linkedin.com/in/matias-obezzi/" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a class="text-light mx-2" href="mailto:matiasobezzi@gmail.com.ar" target="_blank"><i class="fas fa-envelope"></i></a>
            </div>
            <div class="col-lg col-6 order-2 order-lg-3 d-block mx-auto">
                <img src="https://matias-obezzi.github.io/media/foto-cv.png" class="rounded-circle mx-2 img-fluid" style="max-width:170px"  :class="user.color.bg">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    props:['user']
}
</script>

<style scoped>
.text-light:hover{
    text-decoration: none;
}
</style>