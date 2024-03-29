import { ref, watch, computed } from 'vue';
import { optionSelected } from "@/stores/option";
import { inputSearch } from '@/stores/inputSearch';
import { getCommerces } from '@/Api/busqueda/busqueda.js';
import { actualSection } from '@/stores/actualSection';


export default function useSearchLogic() {
    let results = ref([]);

    let category = ref(optionSelected().getOptionSelected()); //creamos una referencia reactiva para la categoría
    let location = ref(optionSelected().getOptionSelectedLocation()); //creamos una referencia reactiva para la localización
    let hashtag = ref(optionSelected().getOptionSelectedHashtag()); //creamos una referencia reactiva para el hashtag
    let searchValue = ref(inputSearch().getInputSearch()); //creamos una referencia reactiva para la búsqueda (input de búsqueda
    let post = ref(optionSelected().getOptionSelectedPost());

    watch(() => optionSelected().getOptionSelected(), (newValue) => { //observamos el cambio de la categoría
        category.value = newValue; //actualizamos la categoría
    });

    watch(() => optionSelected().getOptionSelectedLocation(), (newValue) => { //observamos el cambio de la localización
        location.value = newValue; //actualizamos la localización
    });

    watch(() => inputSearch().getInputSearch(), (newValue) => { //observamos el cambio de la búsqueda
        searchValue.value = newValue; //actualizamos la búsqueda
    });
    
    watch(() => optionSelected().getOptionSelectedHashtag(), (newValue) => { //observamos el cambio del hashtag
        hashtag.value = newValue; //actualizamos el hashtag
    });

    watch(() => optionSelected().getOptionSelectedPost(), (newValue) => { //observamos el cambio del post
        
        post.value = newValue; //actualizamos el post
    });

    const filteredResults = computed(() => {
        if (searchValue.value !== "") {
            return results.value.filter(result => {
                if (actualSection().getActualSection() === "Posts" ) {
                    return (hashtag.value === "" || result.hashtags.includes(hashtag.value)) &&
                        (post.value === "" || result.post_type === post.value) &&
                        result.title.toLowerCase().includes(searchValue.value.toLowerCase())
                } else {
                    return (category.value === "" || result.categories_name === category.value) &&
                        (location.value === "" || result.municipality_name === location.value) &&
                        (hashtag.value === "" || result.hashtags.includes(hashtag.value)) &&
                        result.username.toLowerCase().includes(searchValue.value.toLowerCase());
                }
            });
        } else {
            return results.value.filter(result => {
                if (actualSection().getActualSection() === "Posts") {
                    return (hashtag.value === "" || result.hashtags.includes(hashtag.value)) &&
                        (post.value === "" || result.post_type === post.value)
                }else{
                    return (category.value === "" || result.categories_name === category.value) &&
                        (location.value === "" || result.municipality_name === location.value) &&
                        (hashtag.value === "" || result.hashtags.includes(hashtag.value));
                }
            });
        }
    });
    

    const getCategories = computed(() => {
        let categories = [];
        results.forEach(result => {
            if (!categories.includes(result.category)) {
                categories.push(result.category);
            }
        });
        return categories;
    });

    let option = optionSelected();

    const selectedOption = (name, type) => {    
        if (type === 'categorias') { // Si es una categoria
            if (option.getOptionSelected() === name) { // si ya esta selecccionada
                option.setOptionSelected(''); // Se deselecciona
                return;
            }
            option.setOptionSelected(name); // si no esta seleccionada, se selecciona
        } else if (type === 'localizaciones') { // Si es una localizacion
            if (option.getOptionSelectedLocation() === name) { // Si ya esta seleccionada
                option.setOptionSelectedLocation(''); // Se deselecciona
                return;
            }
            option.setOptionSelectedLocation(name); // Se selecciona la localizacion
        } else if(type === "hashtag") {
            if (option.getOptionSelectedHashtag() === name) { // Si ya esta seleccionada
                option.setOptionSelectedHashtag(''); // Se deselecciona
                return;
            }
            option.setOptionSelectedHashtag(name); // Se selecciona el hashtag
        } else if (type ===  "posts"){
            if(option.getOptionSelectedPost() === name){
                option.setOptionSelectedPost('');
                return;
            }
            option.setOptionSelectedPost(name);
        }
    }
    const apiRequest = async (type) => {
        try {
            const response = await getCommerces("GET", type);
            results.value = response;
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
        }
    };
    

    const resetFilters = () =>{
        option.setOptionSelected('');
        option.setOptionSelectedLocation('');
        option.setOptionSelectedHashtag('');
        option.setOptionSelectedPost('');
        const selected = document.querySelectorAll('.selected');
        selected.forEach(element => {
            element.classList.remove('selected');
        });
        const searhBar = document.querySelector('.search-bar');
        searhBar.value = '';
        inputSearch().setInputSearch('');
    }


    return {
        category,
        filteredResults,
        getCategories,
        selectedOption,
        apiRequest, 
        resetFilters
    };
}

