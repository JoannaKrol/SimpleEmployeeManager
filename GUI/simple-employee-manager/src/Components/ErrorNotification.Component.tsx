import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

type ErrorNotificationProps = {
  error: string;
  clearError: () => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error, clearError }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error !== "") {
      timer = setTimeout(() => {
        clearError();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, clearError]);

  const handleClose = () => {
    clearError();
  };

  const formatText = (text: string) => {
    return text
      .replace(/\\r/g, '')
      .replace(/\\t/g, '')
      .replace(/\\n/g, '<br />');
  };

  return (
    <Snackbar
      open={error !== ""}
      autoHideDuration={5000}
      onClose={handleClose}
      action={
        <button onClick={handleClose} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
          X
        </button>
      }
    >
      <Alert onClose={handleClose} severity="error">
        <span dangerouslySetInnerHTML={{ __html: formatText(error) }} />
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;
