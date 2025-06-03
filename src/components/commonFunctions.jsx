import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "./common"; // Adjust path if needed
import { store } from "../store";
import { notify } from "../UTILS/NotificationProvider";

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

    let errorMessage = "Something Went Wrong. Please Try again";
    if (res.request !== undefined) {
        if (res.request.status === 401) {
            // errorMessage = "Please wait we are refreshing your session."
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        }
        else if (res.request.status === 403) {
            console.log("res?.response", res?.response)
            if (res?.response?.data?.errorMessage === 'INVALID_SESSION_POSITION') {
                errorMessage = "Please select position"
            } if (res?.response?.data?.message === 'INVALID_SESSION_POSITION') {
                errorMessage = "Please select position"
            } else {
                errorMessage = "Forbidden Access"
            }
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })

        }
        else if (res.request.status === 500) {
            console.log("####", res?.response)
            if (res.response.data.errorMessage !== null && res.response.data.errorMessage !== undefined && res.response.data.errorMessage.length > 0) {
                // Sweetalert(res.response.data.errorMessage, 'warning')
                errorMessage = res.response.data.errorMessage
            }
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        }
        else if ((res.request.status === 404) || (res.request.status === 400)) {
            console.log("@@@", res?.response)
            if (res.response.data.errorMessage !== null && res.response.data.errorMessage !== undefined && res.response.data.errorMessage.length > 0) {
                errorMessage = res.response.data.errorMessage;
            }
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        }
        else if (res.request.status === 502) {
            if (res.response.data.errorMessage !== null && res.response.data.errorMessage !== undefined && res.response.data.errorMessage.length > 0) {
                errorMessage = "Server unreachable"
            }
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        }
        else if (res.request.status === 504) {
            if (res.response.data.errorMessage !== null && res.response.data.errorMessage !== undefined && res.response.data.errorMessage.length > 0) {
                errorMessage = "Server Time out"
            }
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        } else {
            fireErrorMessage(errorMessage)
            store.dispatch({ type: "HIDE_LOADER", payload: true })
        }

    }
}

function fireErrorMessage(errorMessage) {
    notify(errorMessage, 'warning')
}

export const apiUrl = process.env.REACT_APP_API_URL;