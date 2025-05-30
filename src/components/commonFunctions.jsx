import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "./common"; // Adjust path if needed
import Swal from "sweetalert2";

export function PasswordField({ value, onChange, name = "password", placeholder = "Password" }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <Input
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                style={{ paddingRight: "2.5rem" }} // space for icon
            />
            <div
                onClick={toggleVisibility}
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#999",
                }}
            >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
        </div>
    );
}


export async function failureResponse(res) {

    let error = "Something Went Wrong. Please Try again";
    if (res.request !== undefined) {
        if (res.request.status === 401) {
            // errorMessage = "Please wait we are refreshing your session."
            // store.dispatch({ type: "HIDE_LOADER", payload: true })
        }
        else if (res.request.status === 403) {
            error = "Forbidden Access"
            fireErrorMessage(error)

        }
        else if (res.request.status === 500) {
            console.log("####", res?.response)
            if (res.response.data.error !== null && res.response.data.error !== undefined && res.response.data.error.length > 0) {
                error = res.response.data.error
            }
            fireErrorMessage(error)
        }
        else if ((res.request.status === 404) || (res.request.status === 400)) {
            console.log("ghdfhdfhdfhfgh---->", res?.response?.data?.error);

            if (res.response.data.error !== null && res.response.data.error !== undefined && res.response.data.error.length > 0) {
                error = res.response.data.error;
            }
            fireErrorMessage(error)
        }
        else if (res.request.status === 502) {
            if (res.response.data.error !== null && res.response.data.error !== undefined && res.response.data.error.length > 0) {
                error = "Server unreachable"
            }
            fireErrorMessage(error)
        }
        else if (res.request.status === 504) {
            if (res.response.data.error !== null && res.response.data.error !== undefined && res.response.data.error.length > 0) {
                error = "Server Time out"
            }
            fireErrorMessage(error)
        } else {
            fireErrorMessage(error)
        }

    }
}



export default async function Sweetalert(text, icon) {
    const isConfirm = await Swal.fire({ text: text, icon: icon, confirmButtonColor: '#3085d6', allowEnterKey: false, allowEscapeKey: false, allowOutsideClick: false, confirmButtonText: "Ok" });
    return isConfirm;
}

function fireErrorMessage(errorMessage) {
    // store.dispatch({ type: "HIDE_LOADER", payload: false })
    Sweetalert(errorMessage, 'warning')
}



export const showNotification = (type, message) => {
    if (type === "success") {
        Swal.fire('Success', message, 'success');
        // NotificationManager.success(message);
    } else if (type === "error") {
        Swal.fire('Error', message, 'error');
        // NotificationManager.error(message);
    } else if (type === "warning") {
        Swal.fire('Warning', message, 'warning');
        // NotificationManager.warning(message);
    } else if (type === "info") {
        Swal.fire('info', message, 'info');
        // NotificationManager.warning(message);
    }
}