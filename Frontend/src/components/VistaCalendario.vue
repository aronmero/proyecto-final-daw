<script setup>
    import {ref} from 'vue';
    import Filtros from '@/components/calendario/widgets/Filtros.vue';
    import Calendario from '@/components/calendario/widgets/Calendar.vue';
    import Card from './calendario/Card.vue';
    //import { posts } from '@/components/calendario/mocks/posts';
    import { filtros } from './calendario/mocks/filtros';
    import { exportar_dia } from './calendario/helpers/exportardia';
    import { obtener_posts_municipios, obtener_municipios } from '@/Api/home/municipios'
    import router from '@/router/index';
    
    const hoy = new Date();
    let dia = exportar_dia(hoy);

    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');

    if(query) filtrar_por_fecha(query);
    const posts_request = await obtener_posts_municipios();
    const posts = posts_request.data;

    const municipios_req = await obtener_municipios();
    const municipios = municipios_req.data;
  
    const filtrar_por_fecha = (date) => {
        let cards = Array.from(document.getElementsByClassName('card'));
        cards.forEach(card => {
            card.style.display = "none";
        });
    }

    if(query != undefined) filtrar_por_fecha(hoy);

</script>
<template>
    <div class="flexible flex flex-col ">
        <div class="flex justify-center items-center  w-[100%] rounded-xl">
            <Filtros v-for="filtro in filtros" :text="filtro"></Filtros> 
        </div>
        <Calendario :posts="posts"></Calendario>
        <b id="fecha" class="fecha">Todos los eventos </b>
        <div class="grid grid-cols-1">
            <Card v-for="post in posts" :post="post" :municipios="municipios"/>
        </div>
    </div>
   
</template>
<style scoped lang="scss">
   .flexible {
    align-items: center;
   }
</style>