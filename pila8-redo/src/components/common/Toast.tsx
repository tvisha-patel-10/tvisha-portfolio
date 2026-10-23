import React, { useEffect } from 'react';
import { CheckIcon } from './Icons';
import './Toast.css';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss, duration]);

  if (!message) return null;

  return (
    <div className="toast-portal" role="status" aria-live="polite">
      <div className="toast-card">
        <span className="toast-icon" aria-hidden="true">
          <CheckIcon size={16} />
        </span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};
