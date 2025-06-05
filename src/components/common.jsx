import styled, { keyframes } from 'styled-components';

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(200, 200, 200, 0.8);
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgba(241,196,15,1);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(241,196,15,1);
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }


  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(241, 196, 15, 1);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(32, 53, 74);
  background-color: rgba(241, 196, 15, 1);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(52, 73, 94, 0.4);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #2c3e50;
    box-shadow: 0 6px 16px rgba(44, 62, 80, 0.6);
    color: #e67e22;
  }

  &:disabled {
    background-color: #dcdde1; /* Muted gray background */
    color: #7f8c8d;            /* Soft gray text */
    cursor: not-allowed;
    box-shadow: none;
    text-shadow: none;
  }
`;


export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3498db;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;       /* Center icon vertically */
  justify-content: center;   /* Center icon horizontally */
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  z-index: 999;
  padding: 0;
  line-height: 0;

  &:hover {
    background-color: #2c80b4; /* Hover color */
  }
`;

export const LineText = styled.p`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
`;


export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f0f0f0" : "#fff",
    borderRadius: "12px",
    border: state.isFocused
      ? "2px solid #3498db"
      : "1px solid #ccc",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(52, 152, 219, 0.2)"
      : "0 2px 6px rgba(0,0,0,0.1)",
    padding: "2px 6px",
    transition: "all 0.3s ease",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.03em",
    color: "#2c3e50",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    opacity: state.isDisabled ? 0.6 : 1,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3498db"
      : state.isFocused
        ? "#ecf0f1"
        : "#fff",
    color: state.isSelected ? "#fff" : "#2c3e50",
    padding: "10px 16px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#95a5a6" : "#2c3e50",
    fontWeight: 600,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#bdc3c7" : "#95a5a6",
    fontWeight: 500,
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    zIndex: 20,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#bdc3c7" : "#3498db",
    transition: "transform 0.3s ease",
    ":hover": {
      color: state.isDisabled ? "#bdc3c7" : "#2c3e50",
    },
  }),
};



// Delay + smooth scroll animation
const scrollText = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  10% {
    transform: translateX(0); /* Show full text for a bit */
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const ScrollingBanner = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 12px 0;

  .scroll-text {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 600;
    color: #e74c3c;
    gap: 8px;
    animation: ${scrollText} 10s ease-in-out infinite;
  }

  svg {
    vertical-align: middle;
  }
`;
