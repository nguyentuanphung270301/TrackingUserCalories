import axios from 'axios'
import queryString from 'query-string';

const baseURL = "http://caloriestrackingapp-env.eba-np7prubr.us-east-1.elasticbeanstalk.com/"

const axiosPrivateClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

axiosPrivateClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('login')}`,
        }
    };
});


axiosPrivateClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default axiosPrivateClient;



















