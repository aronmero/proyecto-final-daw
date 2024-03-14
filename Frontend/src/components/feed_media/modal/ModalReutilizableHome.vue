<script setup>
import router from '../../../router';
import { borrar_comentario } from '../../../Api/home/comentarios';

const props = defineProps({
    info: Object,
    options: Array,
    handler: Function,
    refresh: Function
});
const user = JSON.parse(sessionStorage.getItem("usuario"));
const username = user.usuario.username;

/**
 * Elimina la opcion de borrar comentario si no eres el propietario
 */
if (props.info.username != username && props.options[0].name == "Borrar Comentario") {
    props.options.shift()
}

async function deleteComentario(id) {
    const response = await borrar_comentario(id);
    if (response.status) {
        //router.go();
        props.refresh();
    }
}

/**
 * Recoge estilos del padre
 * */

const estilos = {
    modal: ' absolute bg-white min-w-[200px] rounded-lg p-2 flex flex-col items-start justify-center ',
    modal_button: ' flex items-center font-medium w-[100%]  ',
    modal_superior_dcha: ' top-[50px] right-[20px] '
};

/**
 * Prepara la redirección
 * */

const redirect = (url) => {
    router.push(url);
}


</script>
<template>
    <div ref="modal" :class="`modal bg-white z-50 ${estilos.modal} ${estilos.modal_superior_dcha}`">
        <!-- Botones de las opciones pasadas por parámetro -->
        <template v-for="option in props.options">
            <button :class="`${estilos.modal_button} m-2 `" v-if="option.name == `Borrar Comentario`"
                @click="deleteComentario(props.info.id)">
                <!-- Exporta el icono seleccionado, leído previamente en el padre -->
                <img class="w-[30px] h-[30px] mr-3 " :src="option.icon" alt="">
                <!-- Exporta el nombre -->
                {{ option.name }} </button>
            <button v-else :class="`${estilos.modal_button} m-2 `" @click="() => redirect(option.action)">
                <!-- Exporta el icono seleccionado, leído previamente en el padre -->
                <img class="w-[30px] h-[30px] mr-3 " :src="option.icon" alt="">
                <!-- Exporta el nombre -->
                {{ option.name }}
            </button></template>
    </div>
</template>
<style scoped>
.modal {
    width: fit-content;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transition: .4s ease-in-out;
}
</style>