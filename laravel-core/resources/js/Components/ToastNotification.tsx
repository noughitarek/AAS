// resources/js/components/ToastNotification.tsx

import React from 'react';
import { ToastContainer, toast, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification: React.FC<ToastContainerProps> = (props) => {
  return <ToastContainer {...props} />;
};

export const showToast = (message: string, type: 'default' | 'success' | 'error' | 'info' | 'warning' = 'default') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'warning':
      toast.warn(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default ToastNotification;
