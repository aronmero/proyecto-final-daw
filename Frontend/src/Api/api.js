export const urlApi = "http://127.0.0.1:8000";

export const urlApiHome = urlApi;
/**
 * Genera unas opciones para hacer una peticion a una api. Obtiene un token del SessionStorage
 * @date 3/10/2024 - 5:32:17 PM
 * @author Aarón Medina Rodríguez
 *
 * @param {String} metodo POST, GET, PATCH, DELETE
 * @param {Object} [body=null]
 * @returns {{ method: any; headers: { "Content-Type": string; "User-Agent": string; Accept: string; Authorization: string; }; body: any; }}
 */
export const genOptions = (metodo, body = null) => {
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  const token = user.usuario.token;

  return {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.6.0",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: body,
  };
};


/**
 * Genera unas opciones para hacer una peticion a una api. Obtiene un token del SessionStorage
 * @date 3/10/2024 - 5:32:48 PM
 * @author Aarón Medina Rodríguez
 *
 * @param {String} metodo POST, GET, PATCH, DELETE
 * @returns {{ method: any; headers: { "Content-Type": string; "User-Agent": string; Accept: string; Authorization: string; } }}
 */
export const genOptionsWithoutBody = (metodo) => {
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  const token = user.usuario.token;

  return {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.6.0",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  };
};

/**
 * Genera unas opciones para hacer una peticion a una api sin cuerpo. Obtiene un token del SessionStorage
 * @date 3/11/2024 - 17:38:48 PM
 * @author Antonio José Peñuela López
 *
 * @param {String} metodo POST, GET, PATCH, DELETE
 * @returns {{ method: any; headers: { "Content-Type": string; "User-Agent": string; Accept: string; Authorization: string; } }}
 */
export const genOptionsWithoutAuth = (metodo) => {
  
  return {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.6.0",
      Accept: "application/json",
    }
  };
};

export const genOptionsUpdate = (metodo, body = null) => {
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  const token = user.usuario.token;
  
  return {
    method: metodo,
    headers: {
      "User-Agent": "insomnia/8.6.0",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: body,
  };
};
