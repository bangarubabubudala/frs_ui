import React, { useState, createContext, useContext, useEffect } from "react";

const NotificationContext = createContext();

const icons = {
  success: (
    <svg
      width="36"
      height="36"
      fill="none"
      stroke="#28a745"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg
      width="36"
      height="36"
      fill="none"
      stroke="#dc3545"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg
      width="36"
      height="36"
      fill="none"
      stroke="#ffc107"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  ),
  info: (
    <svg
      width="36"
      height="36"
      fill="none"
      stroke="#17a2b8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  ),
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  // Auto close after 3.5 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: visible ? "rgba(0,0,0,0.4)" : "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: visible ? "auto" : "none",
            transition: "background-color 0.3s ease",
            zIndex: 9999,
          }}
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              width: "320px",
              maxWidth: "90vw",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              padding: "25px 30px",
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              userSelect: "none",
              position: "relative",
            }}
          >
            <div style={{ marginBottom: 15 }}>{icons[notification.type]}</div>
            <h2
              style={{
                margin: "0 0 10px 0",
                color:
                  notification.type === "success"
                    ? "#28a745"
                    : notification.type === "error"
                    ? "#dc3545"
                    : notification.type === "warning"
                    ? "#ffc107"
                    : "#17a2b8",
                fontWeight: "700",
                fontSize: "1.4rem",
              }}
            >
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                color: "#444",
                lineHeight: 1.4,
              }}
            >
              {notification.message}
            </p>
            <button
              onClick={close}
              style={{
                marginTop: 20,
                padding: "8px 18px",
                fontWeight: "600",
                fontSize: "1rem",
                borderRadius: 6,
                border: "none",
                backgroundColor:
                  notification.type === "success"
                    ? "#28a745"
                    : notification.type === "error"
                    ? "#dc3545"
                    : notification.type === "warning"
                    ? "#ffc107"
                    : "#17a2b8",
                color: "#fff",
                cursor: "pointer",
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.1), inset 0 -2px 0 rgba(0,0,0,0.15)",
                transition: "background-color 0.25s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#222")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  notification.type === "success"
                    ? "#28a745"
                    : notification.type === "error"
                    ? "#dc3545"
                    : notification.type === "warning"
                    ? "#ffc107"
                    : "#17a2b8")
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
