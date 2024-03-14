import { urlApi as urlApi, genOptions, genOptionsWithoutBody } from "../api";

/**
 * Devuelve el resultado de los datos del usuario seleccionado
 * @date 3/12/2024 - 6:21:50 PM
 *
 * @async
 * @param {*} username - nombre de usuario
 * @returns {unknown}
 */
export const obtener_datos_usuario = async (username) => {
        const options = genOptionsWithoutBody('GET');
        const user = JSON.parse(sessionStorage.getItem("usuario"));
        const token = user.usuario.token;
    
        let data = await fetch(`${urlApi}/api/user/${username}`, options)
        .then(res => res.json())
        .then(res => res);
        
        return data;
};

/**
 * Devuelve el resultado de los datos de los seguidos del usuario autenticado
 * @date 3/12/2024 - 6:21:50 PM
 *
 * @async
 * @param {*} username - nombre de usuario
 * @returns {unknown}
 */
 export const obtener_followers = async () => {
        const options = genOptionsWithoutBody('GET');
        const user = JSON.parse(sessionStorage.getItem("usuario"));
        const token = user.usuario.token;
    
        let data = await fetch(`${urlApi}/api/follows`, options)
        .then(res => res.json())
        .then(res => res);
        
        return data;
};

