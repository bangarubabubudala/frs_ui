import axios from "axios";
import { LOGIN_API_URL, PROXY_URL } from "./AjaxURLs";

class AuthService {
    login(formData) {
        let loginAxios = axios.create();
        return loginAxios.post(LOGIN_API_URL, formData);
    }
}

export default new AuthService();