import { genOptions, urlApi } from "@/Api/api.js";

export async function getCommerces(metodo, type, body = null) {
  try {
    const options = genOptions(metodo, body);
    const url = new URL(`${urlApi}/api/search`); 
    console.log(url);   
    url.searchParams.append('type', type);
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
