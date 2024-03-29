//http://127.0.0.1:8000/api/review/Ayden%20Labadie

import { urlAp as urlApi, genOptions, genOptionsWithoutBody } from "../api";

export async function obtener_comentarios_post(username) {
    const options = genOptionsWithoutBody('GET');
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const token = user.usuario.token;

 
    let data = await fetch(`http://127.0.0.1:8000/api/review/${username}`, options)
        .then(res => res.json())
        .then(res => res);
   
    return data;
}

/**
 * Description placeholder
 * @date 3/11/2024 - 7:03:00 PM
 *
 * @export
 * @async
 * @param {*} post_id
 * @param {*} user_name
 * @returns {unknown}
 */

export async function reseña_comercio(post_id, comentario) {
    /**
     * {
		"username": "usuario_8",
			"content": "Contenido del comentario 1",
			"post_id":10,
			"avatar": "avatar_8.jpg",
			"user_id": 8
        }
     */

        
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const token = user.usuario.token;

    let data = await fetch(`http://127.0.0.1:8000/api/comment/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.6.0",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            username: user.usuario.username,
            content: comentario,
            post_id: post_id,
            avatar: 'example.png',
            user_id: user.usuario.user_id
        })
    })
        .then(res => res.json())
        .catch(error => {
            console.error(error.message)
        })
        .then(res => res)
        
    return data;
}

