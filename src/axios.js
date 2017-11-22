import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://weighting-439cd.firebaseio.com/'
})

export default instance;