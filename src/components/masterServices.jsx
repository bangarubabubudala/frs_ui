import { FRS_URL, withProxy } from "./AjaxURLs"
import axiosLoaderServices from "./axiosLoaderServices"

class MasterService {
    FRSActionAPI(formData) {
        return axiosLoaderServices.post(withProxy(FRS_URL), formData)
    }
}
export default new MasterService()