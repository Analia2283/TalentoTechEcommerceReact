import React, { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState(null); 

  const showToast = (config) => {
    if (!config || !config.message) return;

    setToastConfig({
      show: true,
      title: config.title || "Notificación",
      message: config.message,
      variant: config.variant || "success",
      delay: config.delay || 1500,
    });
  };

  const hideToast = () => {
    setToastConfig(null);
  };

  const toastDelay = toastConfig?.delay || 1500;

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}

      {toastConfig && (
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={hideToast}
            show={toastConfig.show}
            delay={toastDelay}
            autohide
            bg={toastConfig.variant}
          >
            <Toast.Header closeButton>
              <strong className="me-auto text-dark">{toastConfig.title}</strong>
            </Toast.Header>
            <Toast.Body
              className={
                toastConfig.variant === "success" ||
                toastConfig.variant === "danger"
                  ? "text-white"
                  : ""
              }
            >
              {toastConfig.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
