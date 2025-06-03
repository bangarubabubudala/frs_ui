import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const ErrorToast = ({ error }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (error) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 4000); // 4 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                <Toast.Header closeButton={true}>
                    <ExclamationTriangleFill className="me-2 text-danger" />
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{error}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ErrorToast;
