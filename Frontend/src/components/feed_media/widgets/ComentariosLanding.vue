<script setup>
import { ref, onBeforeUnmount } from 'vue';

import EnviarSVG from '@public/assets/icons/forward.svg';
import { getCommentsOfPost, storeCommentsOfPost } from "@/Api/publicacion/comentarios.js";
import { obtener_datos_usuario } from '@/Api/home/users';
import { obtener_comentarios } from '@/Api/home/comentarios';
import { guardar_comentario } from '../../../Api/home/comentarios';
import ComentarioTiny from './ComentarioTiny.vue';

/**
 * Define props
 */

const props = defineProps({
    post: Object,
    handler: Function
});

/** Referencia que controla que el usuario no pueda enviar mensajes a disposición */
const posteado = ref(false);

/** Obtenemos el post por props */
const post = props.post;

/** Creamos un handler referenciado para el contenedor de comentarios así al refrescar hacemos scrollTop */
const comentario_handler = ref(null);

/**
 * Creo una referencia para el modal
 */
const modal = ref(null);

/**
 * Creo una referencia para el input del chat y poder enviarlo con click
 */
const chat_input = ref(null);

const user_session = JSON.parse(sessionStorage.getItem("usuario"))
const user_req = await obtener_datos_usuario(user_session.usuario.username);

/** 
 * Corrección del 13/03 por David, por cambiar el tipo de respuesta del Backend, devuelve ahora un array en vez de un dato concreto, 
 * Han estado haciendo cambios, así que hago la comprobación para que se ajuste dependiendo de la versión
 * 
 * */

const user = (!Array.isArray(user_req.data)) ? user_req.data : user_req.data[0];

let comentarios = ref(null);

let comentarios_req = await obtener_comentarios(post.post_id);
comentarios.value = comentarios_req.comentarios;

let interval;

/**
 * Refresca la posición del modal de comentarios
 */

const refrescarPosicion = () => {
    comentario_handler.value.scrollTop = comentario_handler.value.scrollHeight;
}

/**
 * Elimina el intervalo antes de cambiar de ruta.
 * */
onBeforeUnmount(() => {
    clearInterval(interval);
    document.body.style.overflow = "auto";
});

/**
* Enviar el comentario
*/
const enviarComentarioPorSubmit = async (post_id, event) => {
    /* Si pulsa enter */
    if (event.key == 'Enter') {
        let texto = event.target.value;
        if (!posteado.value) {
            if (texto != "") {
                const body = JSON.stringify({ "content": `${texto}`, "post_id": post_id })
                const response = await guardar_comentario(body);

                if (response.status) {
                    refrescarPosicion()
                }

            }

            antiSpamFunction();
            refreshComentarios();
        }
    }
};

const enviarComentarioPorClick = async (post_id, texto) => {
    /* si no ha posteado previamente */
    if (!posteado.value && texto != "") {
        const body = JSON.stringify({ "content": texto, "post_id": post_id })
        const response = await guardar_comentario(body)
        if (response.status) {
            refrescarPosicion()
        }
    }
    antiSpamFunction();
    refreshComentarios();
};

/**
* Función que se encarga de evitar que el usuario desde el front envíe las peticiones que quiera
* */
const antiSpamFunction = () => {
    chat_input.value.value = ""
    chat_input.value.readonly = true;

    let secs = 0;
    posteado.value = true;

    interval = setInterval(() => {
        secs++;
        chat_input.value.placeholder = `Debes esperar ${60 - secs} segundos para enviar otro comentario.`;

        if (secs == 60) {
            clearInterval(interval);
            posteado.value = false;
            chat_input.value.placeholder = `Agregar comentario.`;

        };
    }, 1000);
}
/**
 * Refresca el valor de los comentarios 
 * */

const refreshComentarios = async () => {
    let comentarios_req = await obtener_comentarios(post.post_id);
    comentarios.value = comentarios_req.comentarios;
}

</script>

<template>
    <!-- El listado de comentarios -->
    <div ref="comentario_handler"
        class="comentarios  max-h-[500px]    overflow-y-scroll">
            <ComentarioTiny v-if="comentarios.length >= 1" v-for="comentario in comentarios" :comentario="comentario" :refresh="refreshComentarios" /> 
            <ComentarioTiny v-else :comentario="{ content: 'No hay comentarios, ¡se el primero!' }" />
    </div>

    <!-- Formulario para enviar comentario -->
    <div style="z-index: 99 !important;  max-width: 700px;"
        class=" chat w-[100%]  h-[50px] flex items-center  md:bottom-[50px] lg:bottom-[10px] xl:bottom-[10px] 2xl:bottom-[10px] p-[20px_0px]">
        <!-- Avatar del usuario -->
        <img class=" w-[40px] h-[40px] rounded-full " :src="user.avatar" alt="">
        <!-- Input de Enviar datos -->
        <input ref="chat_input"  @keydown="(e) => enviarComentarioPorSubmit(post.post_id, e)"
            class=" input outline-none  w-[100%] h-[100%] p-[20px_20px] bg-[transparent] " type="text" placeholder="Agregar comentario">
        <!-- Botón de Enviar  -->
        <button class="p-[20px]" @click="(e) => enviarComentarioPorClick(post.post_id, chat_input.value)">
            <img class="rotate-180" :src="EnviarSVG" alt="submit" />
        </button>
    </div>
</template>

<style scoped lang="scss">
    .input {
        font-size:.9rem;
    }

    *::-webkit-scrollbar {
        display:none;
    }
</style>