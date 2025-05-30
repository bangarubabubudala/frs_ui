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
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { PasswordField } from "./commonFunctions.jsx";
import AuthService from "./AuthService.jsx";
import { useNavigate } from "react-router-dom";
import { Alert, Col } from "react-bootstrap";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required').nullable(),
        password: Yup.string().required('Type is required').nullable(),
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
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });

        const data = await response.json(); 

        if (response.status === 200) {
            const { accessToken, username, scode, sdesc, employee_name } = data;
            console.log("API Response:", data);

            if (scode === '01') {
                console.log("Login successful.");
                localStorage.setItem("token", accessToken);
                localStorage.setItem("employeeId", username);
                localStorage.setItem("employee_name", employee_name);
                setStatus({ success: true });
                setSubmitting(false);
                navigate("/actionPage");
            } else {
                console.warn("Login failed:", sdesc);
                setStatus({ success: false });
                setErrors({ submit: sdesc });
                setSubmitting(false);
            }
        } else {
            console.error("Unexpected status code:", response.status);
            setStatus({ success: false });
            setErrors({ submit: data?.sdesc || "Login failed" });
            setSubmitting(false);
        }
    } catch (error) {
        console.error("Caught error in login:", error);
        let msg = "Something went wrong";
        setStatus({ success: false });
        setErrors({ submit: msg });
        setSubmitting(false);
    }
};



    return (
        <BoxContainer>
            <FormikProvider value={formik}>
                <FormContainer id="signInForm" name="signInForm" noValidate onSubmit={handleSubmit}>
                    <Input name='username' value={values?.username} placeholder="User ID" onChange={(e) => { handleChange(e) }} />
                    <PasswordField
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {/* <Marginer direction="vertical" margin={10} /> */}
                    {/* <MutedLink href="#">Forget your password?</MutedLink> */}
                </FormContainer>
            </FormikProvider>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" form="signInForm">Signin</SubmitButton>
            {errors.submit && (
                <Col sm={12}>
                    <Alert variant="danger">{errors.submit}</Alert>
                </Col>
            )}
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