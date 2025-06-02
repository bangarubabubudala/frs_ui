import axios from 'axios';
import { failureResponse } from './commonFunctions';
import { store } from '../store';

const axiosLoaderServices = axios.create();
axiosLoaderServices.defaults.timeout = 90000
axiosLoaderServices.interceptors.response.use(async (config) => {
    store.dispatch({ type: "HIDE_LOADER", payload: false })
    return config;
}, function (error) {
    failureResponse(error)
    return Promise.reject(error);
});

axiosLoaderServices.interceptors.request.use(async (config) => {
    const token = "Bearer" + ' ' + localStorage.getItem("token");
    config.headers.Authorization = token;
    config.timeout = 120000
    store.dispatch({ type: "SHOW_LOADER", payload: true })
    return config;
}, function (error) {
    failureResponse(error)
    return Promise.reject(error);
});
export default axiosLoaderServices;