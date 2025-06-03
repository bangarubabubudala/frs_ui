import React, { useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    LineText,
    MutedLink,
    SubmitButton,
} from "./common.jsx";
import { Marginer } from "../marginer";
import { AccountContext } from '../components/accountContect.jsx';
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { PasswordField } from "./commonFunctions.jsx";
import AuthService from "./AuthService.jsx";
import { useNavigate } from "react-router-dom";
import { Alert, Col } from "react-bootstrap";
import { ACCOUNT_INITIALIZE } from "../store/actions.jsx";
import { useDispatch } from "react-redux";
import { store } from "../store/index.jsx";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import SubmitErrorAlert from "../UTILS/SubmitErrorAlert.jsx";
import CustomErrorMessage from "../UTILS/CustomErrorMessage.jsx";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('User ID is Required').nullable(),
        password: Yup.string().required('Password is Required').nullable(),
    })

    const formik = useFormik({
        initialValues: initialValues, enableReinitialize: true, validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("valuesss--->", values);
            if (isValid) {
                onClickSignIn()
            }
        }
    })
    const { values, isValid, setFieldValue, touched, errors, handleSubmit, handleChange, resetForm, setErrors, setStatus, setSubmitting } = formik

    const onClickSignIn = async () => {
        console.log("SIGNIN CLICKED WITH VALUES:", values);
        try {
            store.dispatch({ type: "SHOW_LOADER", payload: true })
            const res = await AuthService.login(values);
            store.dispatch({ type: "HIDE_LOADER", payload: false })
            if (res.status === 200) {
                const { accessToken, username, scode, sdesc, employee_name } = res?.data;
                console.log("res?.data", res?.data);
                if (scode == '01') {
                    console.log("enters here ");
                    let jsonData = res.data;
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("employeeId", username);
                    localStorage.setItem("employee_name", employee_name);
                    dispatcher({
                        type: ACCOUNT_INITIALIZE,
                        payload: { isLoggedIn: true, user: jsonData, token: accessToken }
                    });
                    setStatus({ success: true });
                    setSubmitting(false);
                    navigate("/actionPage");
                } else {
                    console.log("enters here 2");
                    setStatus({ success: false });
                    setErrors({ submit: sdesc });
                    setSubmitting(false);
                }
            } else {
                console.log("enrtg here");
                setStatus({ success: false });
                setErrors({ submit: res.data.sdesc });
                setSubmitting(false);
            }
        } catch (error) {
            console.log("enters here 3");
            console.error("Caught error in login:", error); // ← this should always print on error
            let msg = "Invalid credentials";
            if (error?.response?.status === 401) {
                msg = error.response.data?.sdesc || msg;
            }
            setStatus({ success: false });
            setErrors({ submit: msg });
            setSubmitting(false);
        }
    };

    // const onClickSignIn = async () => {
    //     console.log("SIGNIN CLICKED WITH VALUES:", values);
    //     try {
    //         const res = await fetch('/api/auth/signin', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(values),
    //         });

    //         const data = await res.json(); // parse JSON from fetch response
    //         console.log("res data", data);

    //         if (res.status === 200) {
    //             const { accessToken, username, scode, sdesc, employee_name } = data;

    //             if (scode === '01') {
    //                 console.log("Login successful");
    //                 localStorage.setItem("token", accessToken);
    //                 localStorage.setItem("employeeId", username);
    //                 localStorage.setItem("employee_name", employee_name);
    //                 setStatus({ success: true });
    //                 setSubmitting(false);
    //                 navigate("/actionPage");
    //             } else {
    //                 console.log("Login failed (valid request but invalid creds)");
    //                 setStatus({ success: false });
    //                 setErrors({ submit: sdesc });
    //                 setSubmitting(false);
    //             }
    //         } else {
    //             console.log("Login failed (bad response status)");
    //             setStatus({ success: false });
    //             setErrors({ submit: data.sdesc || "Login failed" });
    //             setSubmitting(false);
    //         }
    //     } catch (error) {
    //         console.error("Caught error in login:", error);
    //         let msg = "Invalid credentials";
    //         setStatus({ success: false });
    //         setErrors({ submit: msg });
    //         setSubmitting(false);
    //     }
    // };

    return (
        <BoxContainer>
            <FormikProvider value={formik}>
                <FormContainer id="signInForm" name="signInForm" noValidate onSubmit={handleSubmit}>
                    <Input name='username' value={values?.username} placeholder="User ID" onChange={(e) => { handleChange(e) }} />
                    <CustomErrorMessage name="username" />
                    <PasswordField
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <CustomErrorMessage name="password" />
                    {/* <Marginer direction="vertical" margin={10} /> */}
                    {/* <MutedLink href="#">Forget your password?</MutedLink> */}
                </FormContainer>
            </FormikProvider>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" form="signInForm" disabled={formik.isSubmitting}>
                Sign in
            </SubmitButton>
            <SubmitErrorAlert error={errors.submit} />
            <Marginer direction="vertical" margin="5px" />
            {/* <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText> */}
        </BoxContainer>
    );
}