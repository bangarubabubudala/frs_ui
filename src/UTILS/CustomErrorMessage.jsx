import { useFormikContext, ErrorMessage } from 'formik';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

const CustomErrorMessage = ({ name }) => {
  const { errors, touched } = useFormikContext();
  const hasError = touched[name] && errors[name];

  return hasError ? (
    <small className="custom-error-message">
      <ExclamationTriangleFill className="error-icon" />
      <ErrorMessage name={name} />
    </small>
  ) : null;
};
export default CustomErrorMessage;
