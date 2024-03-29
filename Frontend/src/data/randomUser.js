const apiURL = `https://randomuser.me/api/`; 

const fetchRequest = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.results[0];
}

const getUsers = async () => {
    let users = [];
    for (let i = 0; i < 10; i++) { 
        const userData = await fetchRequest();
        userData.state = true; //añadimos un estado para saber si el usuario está seguido o no
        users.push(userData);
    }
    return users;
}

export default getUsers;
