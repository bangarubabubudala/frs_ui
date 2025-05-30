import React, { useState } from "react";
import Select from "react-select";
import {
    BoxContainer as CommonBox,
    FormContainer,
    SubmitButton
} from "./common.jsx";
import { Marginer } from "../marginer/index.jsx";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { BackDrop, backdropVariants, BoxContainer, expandingTransition, HeaderContainer, HeaderText, InnerContainer, SmallText, TopContainer } from "./index.jsx";
import masterServices from "./masterServices.jsx";
import { showNotification } from "./commonFunctions.jsx";

const options = [
    { label: "Clock In", value: "I" },
    { label: "Clock Out", value: "O" },
];

export function ActionPage() {
    const validationSchema = Yup.object().shape({
        selectedOption: Yup.object().required("Please select an option").nullable(),
    });

    const formik = useFormik({
        initialValues: {
            selectedOption: null,
            attendanceType: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Submitted values:", values);
            ClockInAndOut()
        },
    });

    const empName = localStorage.getItem("employee_name")

    const { values, setFieldValue, handleSubmit, errors, touched } = formik;

    const ClockInAndOut = async () => {
        const formData = {
            employeeId: localStorage.getItem("employeeId"),
            attendanceType: values?.attendanceType
        };
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('/api/employeeRegistration/attendanceSave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("res------->", data);

            const { status, messege } = data;
            const statusCode = status === 'Y' ? 'success' : 'error';
            showNotification(statusCode, messege);
        } catch (error) {
            console.error("Error during clock in/out:", error);
            showNotification('error', 'Something went wrong');
        }
    };


    const [isExpanded, setExpanded] = useState(false);
    return (
        <BoxContainer>
            <TopContainer>
                <BackDrop
                    initial={false}
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={backdropVariants}
                    transition={expandingTransition}
                />
                <HeaderContainer>
                    <HeaderText>Hello</HeaderText>
                    <HeaderText>{empName + "!"}</HeaderText>
                    <SmallText>Welcome to FRS</SmallText>
                </HeaderContainer>
            </TopContainer>
            <InnerContainer>
                <CommonBox>
                    <FormikProvider value={formik}>
                        <FormContainer onSubmit={handleSubmit} noValidate name="frsForm" id="frsForm">
                            <Select
                                name="selectedOption"
                                options={options}
                                value={values.selectedOption}
                                onChange={(selectedOption) => {
                                    setFieldValue("selectedOption", selectedOption)
                                    setFieldValue("attendanceType", selectedOption?.value)
                                }}
                                placeholder="Select an option"
                            />
                            {errors.selectedOption && touched.selectedOption && (
                                <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                    {errors.selectedOption}
                                </div>
                            )}
                        </FormContainer>
                    </FormikProvider>
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton type="submit" form="frsForm">Submit</SubmitButton>
                </CommonBox>
            </InnerContainer>
        </BoxContainer>
    );
}
