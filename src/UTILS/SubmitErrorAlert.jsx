import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

const SubmitErrorAlert = ({ error }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (error) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 4000); // Alert disappears after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (!show || !error) return null;

    return (
        <Alert
            variant="danger"
            className={`custom-error-alert d-flex align-items-center fade ${show ? 'show' : ''}`}
            style={{ gap: '0.5rem' }}
        >
            <ExclamationTriangleFill
                size={20}
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span style={{ verticalAlign: 'middle',paddingLeft:"5px" }}>{error}</span>
        </Alert>
    );
};

export default SubmitErrorAlert;
