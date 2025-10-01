import axios from "axios";


  const BASE ="https://jsonplaceholder.typicode.com";

export async function fetchUsers(opts = {}) {
    const {data}=await axios.get(`${BASE}/users`, opts);
    return data;
}

export async function fetchUsersById(id, opts ={}) {
    const {data} = await axios.get (`${BASE}/users/${id}`, opts);
    return data;
    
}