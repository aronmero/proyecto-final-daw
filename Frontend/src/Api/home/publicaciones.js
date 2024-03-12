import { urlApi, genOptions, genOptionsWithoutBody } from "../api";

export async function obtener_posts_seguidos() {
    const options = genOptionsWithoutBody('GET');
    let data = await fetch(`${urlApi}/api/home`, options)
        .then(res => res.json())
        .then(res => res);
    return data;
}

export async function obtener_posts() {
    const options = genOptionsWithoutBody('GET');
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const token = user.usuario.token;

    try {
        let data = await fetch(`${urlApi}/api/home_todos`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "insomnia/8.6.0",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
        .then(res => res)
        .catch(err => {
            console.error(err)
        })
            
        return data;
    } catch(error) {
        console.error(error);
    }
    
}

export async function obtener_tipo_comercio(comercio_username) {
    const options = genOptionsWithoutBody('GET');
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const token = user.usuario.token;

    let data = await fetch(`${urlApi}/api/user/${comercio_username}`, options)
    .then(res => res.json())
    .then(res => res);
    
    return data;

}
