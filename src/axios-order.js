import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d179f.firebaseio.com/'
});

export default instance;