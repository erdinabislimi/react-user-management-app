import axios from "axios";
const BASE = "https://jsonplaceholder.typicode.com";

export const fetchUsers    = (opts={}) => 
  axios.get(`${BASE}/users`, opts).then(r => r.data);

export const fetchUserById = (id,opts={}) => 
  axios.get(`${BASE}/users/${id}`, opts).then(r => r.data);
