import { FRS_URL } from "./AjaxURLs"
import axiosLoaderServices from "./axiosLoaderServices"

class MasterService {
    FRSActionAPI(formData) {
        return axiosLoaderServices.post(FRS_URL, formData)
    }
}
export default new MasterService()