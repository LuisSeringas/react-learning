import axios from 'axios';

const db = axios.create({
    baseURL: 'https://react-burger-builder-d48b9.firebaseio.com/',
});

export default db;
