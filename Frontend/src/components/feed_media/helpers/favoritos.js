/**
 * Guarda los favoritos en variable localStorage
 * @author David
 * @returns 
 */
export const obtener_favoritos = () => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if(favoritos != null) {
        return favoritos;
    } else {
        localStorage.setItem('favoritos', '[{}]');
        favoritos = JSON.parse(localStorage.getItem("favoritos"));
    }
    return favoritos
}

export const aniadir_favorito = (item) => {
    const favoritos = JSON.parse(obtener_favoritos());
    
    if(favoritos.indexOf(item) == -1) {
        favoritos.push(item);
    } else {
        favoritos.splice(favoritos.indexOf(item), 1);
    }
     // guardamos los cambios
     localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

export const borrar_favorito = (item) => {
    const favoritos = JSON.parse(obtener_favoritos());
    // borramos el favorito
    favoritos.splice(favoritos.indexOf(item), 1);
    // guardamos los cambios
    localStorage.setItem("favoritos", favoritos);
}

export const en_favoritos = (item) => {
    let existe = false;
    const favoritos = JSON.parse(obtener_favoritos());
    console.log(favoritos)
    // favoritos.forEach(favorito => {
    //     if(favorito == item) existe  =  true;
    // })
    return existe;
}

export const guardar_en_local = (array) => {
    localStorage.setItem('favoritos', array);
}

export const purgarFavoritos = () => {
    localStorage.setItem('favoritos', '[]');
}