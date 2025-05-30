export const API_URL = 'https://api.apnidhi.in/cfsshrms'
export const LOGIN_API_URL = API_URL + '/api/auth/signin';
export const FRS_URL = API_URL + '/employeeRegistration/attendanceSave';
export const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export function withProxy(url) {
    return PROXY_URL + url;
}

