import React, { useState } from "react";
import Select from "react-select";
import {
    BackButton,
    BoxContainer as CommonBox,
    customSelectStyles,
    FormContainer,
    ScrollingBanner,
    SubmitButton
} from "./common.jsx";
import { Marginer } from "../marginer/index.jsx";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { BackDrop, backdropVariants, BoxContainer, expandingTransition, HeaderContainer, HeaderText, InnerContainer, SmallText, TopContainer } from "./index.jsx";
import masterServices from "./masterServices.jsx";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import CustomErrorMessage from "../UTILS/CustomErrorMessage.jsx";
import { notify } from "../UTILS/NotificationProvider.jsx";
import { FaExclamationTriangle } from 'react-icons/fa';
import { Navbar } from "../UTILS/Navbar.jsx";


const options = [
    { label: "Clock In", value: "I" },
    { label: "Clock Out", value: "O" },
];

export function ActionPage() {
    const validationSchema = Yup.object().shape({
        attendanceType: Yup.string().required("Please select an option").nullable(),
    });

    const navigate = useNavigate();

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

    const ClockInAndOut = () => {
        let formData = {}
        formData['employeeId'] = localStorage.getItem("employeeId")
        formData['attendanceType'] = values?.attendanceType
        masterServices.FRSActionAPI(formData).then((res) => {
            console.log("res------->", res?.data);
            const { status, messege } = res?.data
            const statusCode = status === 'Y' ? 'success' : 'error'
            notify(statusCode, messege)
        })
    }


    const [isExpanded, setExpanded] = useState(false);

    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6; // Sunday = 0, Saturday = 6


    return (
        <BoxContainer>
            <Navbar showBackButton={true} />
            <TopContainer>
                <BackDrop
                    initial={false}
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={backdropVariants}
                    transition={expandingTransition}
                />
                <HeaderContainer>
                    <HeaderText>Hello!</HeaderText>
                    <HeaderText >{empName + "."}</HeaderText>
                    <SmallText >Welcome to FRS</SmallText>
                </HeaderContainer>
            </TopContainer>
            <InnerContainer>
                {isWeekend && (
                    <ScrollingBanner>
                        <div className="scroll-text">
                            <FaExclamationTriangle />
                            FRS is not allowed on weekends
                            <FaExclamationTriangle />
                        </div>
                    </ScrollingBanner>
                )}
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
                                styles={customSelectStyles}
                                isDisabled={isWeekend}
                            />
                            <CustomErrorMessage name="attendanceType" />
                        </FormContainer>
                    </FormikProvider>
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton type="submit" form="frsForm" disabled={isWeekend}> Submit </SubmitButton>
                    {errors.submit && (
                        <div style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                            {errors.submit}
                        </div>
                    )}
                </CommonBox>
            </InnerContainer>
        </BoxContainer>
    );
}
