<script setup>
    import Grid from "@/components/comun/layout.vue";
    
    import Header from "@/components/comun/header.vue";
    import Footer from "@/components/comun/footer.vue";

    import VistaCalendario from '@/components/VistaCalendario.vue'
    
</script>

<template >
    <Header />

    <Grid>
        <template v-slot:Left  >
   
        </template>
        <Suspense>
            <VistaCalendario />
        </Suspense>
           
        <template v-slot:Right >

        </template>
    </Grid>
    <Footer />
</template>

<style scoped lang="scss">

</style>
