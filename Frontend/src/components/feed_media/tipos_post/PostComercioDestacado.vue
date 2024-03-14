<script setup>
import { ref } from 'vue';
import { estilos } from './estilos';

import StarSVG from '@public/assets/icons/star.svg';
import StarEmptySVG from '@public/assets/icons/starEmpty.svg';
import DownSVG from '@public/assets/icons/down.svg';

import UpSVG from '@public/assets/icons/up.svg';

import ShareSVG from '@public/assets/icons/share.svg';
import ChatSVG from '@public/assets/icons/chat.svg';
import BookmarkEmptySVG from '@public/assets/icons/bookmark_empty.png'
import BookmarkSVG from '@public/assets/icons/bookmark.png';

import MoreSVG from '@public/assets/icons/ellipsis.svg';
import UserSVG from '@public/assets/icons/user.svg';

import TipoOferta from '@public/assets/icons/tipo_oferta.svg'
import TipoEvento from '@public/assets/icons/tipo_evento.svg'

import { share } from '@/components/feed_media/helpers/share.js';
import { text_to_speech } from '../helpers/textspeech';

import { datetranslatesql } from './../helpers/datetranslate.js'
import router from '../../../router';

import { en_favoritos, obtener_favoritos } from '../helpers/favoritos';
import ComentariosLanding from '../widgets/ComentariosLanding.vue';
import BotonSpeaker from '../widgets/BotonSpeaker.vue';


import Comentarios from '../modal/ComentariosHome.vue';
import PostComercio from './PostComercio.vue';
import PostComercioDestacado from './PostComercioDestacado.vue';
import PostAyuntamiento from './PostAyuntamiento.vue';


const props = defineProps({
    post: Object,
    tipo: String,
    abrirComentarios: Function
});


const post = ref(props.post);
const post_reference = ref({dataset: {favorito:false}});
const modalHandler = ref(false);
const modal = ref(null);

const modal_comentarios = ref(null);
/** Genero la referencia para abrir o cerrar el modal de comentarios */
const comentariosVisibles = ref(false);

/** Genero la referencia para obtener los favoritos del usuario, hecho en frontend por no poderse poner en back */
const favoritos = ref(obtener_favoritos());

/** Abre el modal del perfil */
const abrirModal = () => {
    if (modalHandler.value) {
        modal.value.style.display = "none";
        modalHandler.value = false;
    } else {
        modal.value.style.display = "flex";
        modalHandler.value = true;
    }
}



/**
 * Redirecciona a la url destino 
 * */
const redirect = (url) => {
    router.push(url)
}

/** Dependiendo del tipo de post, carga un icono  */
const tipo = post.value.name;
let IconoTipo = "";

if (tipo == 'Post') IconoTipo = TipoOferta; // 1 Post
if (tipo == 'Evento') IconoTipo = TipoEvento; // 2 Event

/** referencia los comentarios */
let comentarios = ref(null);


const aniadir_favorito = (item) => {
        if (favoritos.value.indexOf(item) == -1) {
            favoritos.value.push(item);
            post_reference.value.dataset.favorito = "true";
        } else {
            favoritos.value.splice(favoritos.value.indexOf(item), 1);
            post_reference.value.dataset.favorito = "false";
        }
        // guardamos los cambios
        localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
    }

    const comentariosPadre = ref(false);


const abrirComentariosLanding = () => {
    if(!comentariosPadre.value) {
        comentariosPadre.value = true;
    } else {
        comentariosPadre.value = false;
    }

}


</script>
<template>
    <article  :class="` post ${estilos.post} relative`" ref="post_reference"
        :data-start_date="post.start_date" :data-end_date="post.end_date"
        :data-favorito="(favoritos.indexOf(post.title) == -1) ? 'false' : 'true'"
    >
        <!-- Contenedor del header del post -->
        <div class=" post-header w-[100%] h-[60px] flex items-center ">
            <div class=" avatar-wrapper w-[50px] h-[50px] rounded-full overflow-hidden mr-2 ">
                <img @click="redirect(`perfil/${post.username}`)"
                    class=" cursor-pointer w-[100%] h-[100%] object-cover  " :src="post.avatar"
                    alt="avatar_usuario">
            </div>
            <div class=" flex flex-col items-start texts w-[100%]  h-[100%]  ">
                <b @click="redirect(`perfil/${post.username}`)" class="cursor-pointer">{{ post.username }}</b>
                <small>{{ datetranslatesql(post.start_date) }}</small>
                <button click="" class=" rating flex h-[fit-content] items-center justify-start "
                    v-if="post.avg != null">
                    <img class="  " :src="StarSVG" v-for="index in Math.floor(post.avg)" alt="star" loading="lazy"
                        :title="post.avg" />
                    <img class=" " :src="StarEmptySVG" v-for="index in (5 - Math.floor(post.avg))" alt="star"
                        loading="lazy" :title="post.avg" />
                    <small>({{ post.avg.toFixed(2) }})</small>
                </button>
            </div>
            <button @click="() => abrirModal(post.id)" class="mr-4">
                <img :src="MoreSVG" alt="dots">
            </button>
        </div>

        <!-- Contenedor de la imagen del post -->

        <div
            class=" post-content w-[100%] h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[600px] rounded-2xl overflow-hidden mt-5 mb-5 ">
            <img @click="redirect(`post/${post.post_id}`)" class=" w-[100%] h-[100%] object-cover  cursor-pointer"
                :src="post.image" :alt="post.titulo">
        </div>

        <!-- post footer -->
        <div class=" post-footer w-[100%] h-[50px] flex pt-5 pb-5 ">

            <!-- Comentarios -->
            <button @click="() => props.abrirComentarios()" class=" flex flex-row items-center mr-3 ">
                <img :src="ChatSVG" loading="lazy" />
                {{ post.comment_count }}
            </button>

            <!-- Compartir -->
            <button @click="share({
                title: post.title,
                text: post.description,
                url: `post/${post.post_id}`
            })" class=" flex flex-row items-center mr-2 ">
                <img :src="ShareSVG" loading="lazy" />
            </button>

            <!-- Quitar y aniadir de guardados -->
            <button @click="() => aniadir_favorito(post.title)" v-if="favoritos.indexOf(post.title) != -1"
                class=" flex  max-w-[22px] min-h-[26px] flex-row items-center ml-0 ">
                <img class="object-scale-down" :src="BookmarkSVG" loading="lazy" />
            </button>
            <button @click="() => aniadir_favorito(post.title)" v-else
                class=" flex  max-w-[22px] min-h-[26px] flex-row items-center ml-0 ">
                <img class="object-scale-down mt-0 " :src="BookmarkEmptySVG" loading="lazy" />
            </button>

        </div>

         <!-- Contenido del Post -->
         <div class="information ">
            <h1>
                <img :src="IconoTipo" alt="icono-evento" loading="lazy">
                {{ post.title }}
                <BotonSpeaker :texto="post.title" />
            </h1>
            <span>
                {{ post.description }} 
                <a :href="`busqueda/q=${hashtag}`" v-if="post.hashtags.length != 0" v-for="hashtag in post.hashtags" class="mr-[3px] font-bold">#{{hashtag}}</a>
                <BotonSpeaker :texto="post.description" />
            </span>

            <!-- Comentarios en landing -->
            <div class=" comentarios m-[20px_0px] flex flex-col ">
                <b class=" flex ">Comentarios 
                    <button  class="bg-[white] overflow-hidden " @click="abrirComentariosLanding" > 
                        <img v-if="!comentariosPadre" :src="DownSVG" alt="">
                        <img v-if="comentariosPadre" :src="UpSVG" alt="">
                    </button>
                </b>
                <ComentariosLanding v-if="comentariosPadre" :post="post"/>
            </div>
        </div>

        <!-- Modal de Destacados -->
        <div :class="` badge modal modal-izq destacado ${estilos.modal} ${estilos.modal_inferior_izq} `">
            <button :class="`${estilos.modal_button} `">
                <img class=" w-[20px] h-[20px]  mr-3 " :src="StarSVG" />
                Destacado por la comunidad
            </button>
        </div>

        <!-- Modal de Ver Más -->
        <div ref="modal" :class="`modal ${estilos.modal} ${estilos.modal_superior_dcha}`">
            <!-- Botón ver perfil -->
            <button @click="redirect(`perfil/${post.username}`)" :class="`${estilos.modal_button} m-2 `">
                <img class="w-[30px] h-[30px] mr-3 " :src="UserSVG" loading="lazy" />
                Ver perfil
            </button>
            <!-- Botón ver reseñas comercio -->
            <button :class="`${estilos.modal_button} m-2 `">
                <img class="w-[30px] h-[30px]  mr-3 " :src="StarSVG" loading="lazy" />
                Reseñas
            </button>
        </div>
    </article>

</template>

<style scoped lang="scss">
    @import './estilos.scss';
</style>