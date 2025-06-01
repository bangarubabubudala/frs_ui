import axios from "axios";
import { LOGIN_API_URL, PROXY_URL } from "./AjaxURLs";

class AuthService {
    login(formData) {
        let loginAxios = axios.create({
            headers: {
                'authority': 'api.apnidhi.in',
                'method': 'POST',
                'path': '/cfsshrms/api/auth/signin',
                'scheme': 'https',
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'Origin': 'https://apcfssfrs.netlify.app/',
                'Referer': 'https://api.apnidhi.in/cfsshrms',
            }
        });
        return loginAxios.post(LOGIN_API_URL, formData);
    }
}

export default new AuthService();