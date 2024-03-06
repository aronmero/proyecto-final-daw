import { random } from "./helpers/random";
import { lorem } from "./helpers/lorem";
/**
 * Retorna un array de prueba
 * @author 'David Martín Concepción'
 * @date 3/6/2024 - 5:46:22 PM
 * 
 * @type {{}}
 */
export const posts = [
    {
        id: 1,
        titulo: "Titulo de ejemplo",
        contenido: `${lorem}`,
        usuario: {
            nombre: 'comercio',
            avatar: `https://randomuser.me/api/portraits/men/${random(91)}.jpg`,
            tipo: 'comercio'
        },
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fecha_publicacion: "2/19/2024", /* fecha formato mes/dias/año  */
        destacado: true,
        institucional: false,
        likes: 0,
        rating: 4.9
    },
    {
        id: 2,
        titulo: "Titulo de #2",
        contenido: `${lorem}`,
        usuario: {
            nombre: 'comercio_1',
            avatar: `https://randomuser.me/api/portraits/men/${random(91)}.jpg`,
            tipo: 'comercio'
        },
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fecha_publicacion: "2/19/2024",
        likes: 1,
        rating: 2
    },
    {
        id: 3,
        titulo: "Titulo de ejemplo",
        contenido: `${lorem}`,
        usuario: {
            nombre: 'ayuntamiento',
            avatar: `https://randomuser.me/api/portraits/men/${random(91)}.jpg`,
            tipo: 'ayuntamiento'
        },
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fecha_publicacion: "2/19/2024",
        destacado: true,
        institucional: true
    }
]