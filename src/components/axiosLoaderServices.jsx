import axios from 'axios';
import { failureResponse } from './commonFunctions';

const axiosLoaderServices = axios.create({
    headers: {
        'authority': 'api.apnidhi.in',
        'method': 'POST',
        'path': '/cfsshrms/employeeRegistration/attendanceSave',
        'scheme': 'https',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://apcfssfrs.netlify.app/',
        'Referer': 'https://api.apnidhi.in/cfsshrms',
    }
});
axiosLoaderServices.defaults.timeout = 90000
axiosLoaderServices.interceptors.response.use(async (config) => {
    return config;
}, function (error) {
    failureResponse(error)
    return Promise.reject(error);
});

axiosLoaderServices.interceptors.request.use(async (config) => {
    const token = "Bearer" + ' ' + localStorage.getItem("token");
    config.headers.Authorization = token;
    config.timeout = 120000
    return config;
}, function (error) {
    failureResponse(error)
    return Promise.reject(error);
});
export default axiosLoaderServices;