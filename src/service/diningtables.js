import axios from "axios";

const url = 'http://localhost:8080/api/tables/';

const getAll = () => {
    const response = axios.get(url);
    return response.then(response => response.data);
}

// can't be delete :p
const destroy = id => {
    const response = axios.delete(`${url}${id}`);
    return response.then(response => response.data);
}

const create = newObject => {
    const response = axios.post(url, newObject);
    return response.then(response => response.data);
}

export default { getAll, destroy, create };