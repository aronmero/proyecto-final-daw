<script setup>
import {ref} from 'vue';
import UserSVG from '@public/assets/icons/user.svg';
import MoreSVG from '@public/assets/icons/ellipsis.svg';
import DeleteSVG from '@public/assets/icons/delete.svg';
import StarSVG from '@public/assets/icons/star.svg';
import ModalReutilizableHome from '../modal/ModalReutilizableHome.vue';
import { datetranslatesql } from '../helpers/datetranslate';

const props = defineProps({
    comentario: Object,
    refresh: Function
});

const comentario = props.comentario;

//const user = comentario.username;


    /**
     * Obtenemos el usuario para poder mostrar el avatar 
     * */

    /**
     * Creo la referencia para poder utilizar ocultar y mostrar el modal
     * */
    const modalHandler = ref(false);

    const abrirModal = () => {
        if (modalHandler.value) {
            modalHandler.value = false;
        } else {
            modalHandler.value = true;
        }

    }

    /**
     * Instauro las opciones que le voy a pasar al componente del modal reutilizable
     * */
    const opcionesModal = [
        {
            name: "Borrar Comentario",
            action: ``,
            icon: DeleteSVG
        },
        {
            name: "Ver perfil",
            action: `/perfil/${comentario.username}`,
            icon: UserSVG
        },
        {
            name: "Reseñas",
            action: `/perfil/${comentario.username}`,
            icon: StarSVG
        }
    ];


</script>
<template>
    <div class="comentario w-[100%]  flex relative">
        <div class="left flex flex-col items-center justify-center mr-[30px] max-w-[100px]">
            <img class="w-[50px] h-[50px] rounded-full bg-slate-400 mr-[10px]" :src="comentario.avatar" alt="">
            <b class=" username whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis" :title="comentario.username"> {{comentario.username}}</b>
            <small v-if="comentario.comment_creation != null">{{ datetranslatesql(comentario.comment_creation)
            }}</small>
        </div>
        <span class="max-w-[80%]">{{ comentario.content}}</span>
        <button v-if="comentario.username" class="absolute right-0 "  @click="() => abrirModal()">
            <img :src="MoreSVG" alt="">
        </button>

        <ModalReutilizableHome v-if="modalHandler"  :info="comentario" :options="opcionesModal" :refresh="props.refresh"
            :handler="abrirModal" />
    </div>
</template>
<style scoped lang="scss">
.comentario {
    //box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-bottom: 1px solid rgba(206, 206, 206);
    padding: 10px 0px;
    margin: 10px 0px;

    .username {
        margin-top:10px;
        font-size: .9rem;
        text-align:center;
        width:100%;
    }
}</style>