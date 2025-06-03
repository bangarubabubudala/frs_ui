import React, { useState, useEffect } from "react";
import {
  MdCheckCircle,
  MdError,
  MdWarning,
  MdInfo,
} from "react-icons/md";

// Global notifier function
let notifyFn = null;

export const notify = (type, message) => {
  if (notifyFn) notifyFn(type, message);
};

// Icons for different types
const iconMap = {
  success: <MdCheckCircle size={50} color="#28a745" />,
  error: <MdError size={50} color="#dc3545" />,
  warning: <MdWarning size={50} color="#ffc107" />,
  info: <MdInfo size={50} color="#17a2b8" />,
};

// Color mapping
const getColor = (type) => {
  switch (type) {
    case "success": return "#28a745";
    case "error": return "#dc3545";
    case "warning": return "#ffc107";
    case "info": return "#17a2b8";
    default: return "#333";
  }
};

export const NotificationProvider = () => {
  const [state, setState] = useState({ visible: false, type: "", message: "" });

  const show = (type, message) => {
    setState({ visible: true, type, message });
  };

  const close = () => {
    setState({ ...state, visible: false });
  };

  useEffect(() => {
    notifyFn = show;
    return () => {
      notifyFn = null;
    };
  }, []);

  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => close(), 3500);
      return () => clearTimeout(timer);
    }
  }, [state.visible]);

  if (!state.visible) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          background: "rgba(0,0,0,0.3)",
          zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          backgroundColor: "#fff",
          padding: "25px 30px",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          borderLeft: `6px solid ${getColor(state.type)}`,
          zIndex: 9999,
          minWidth: "320px",
          maxWidth: "90vw",
          textAlign: "center",
          animation: "zoomIn 0.3s ease-out",
        }}
      >
        <div>{iconMap[state.type]}</div>
        <h3
          style={{
            margin: "10px 0",
            color: getColor(state.type),
            fontWeight: 700,
            fontSize: "1.3rem",
          }}
        >
          {state.type.charAt(0).toUpperCase() + state.type.slice(1)}
        </h3>
        <p style={{ color: "#444", fontSize: "1rem", marginBottom: "20px" }}>
          {state.message}
        </p>
        <button
          onClick={close}
          style={{
            padding: "8px 20px",
            backgroundColor: getColor(state.type),
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#222")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = getColor(state.type))}
        >
          OK
        </button>
      </div>

      <style>{`
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
};
