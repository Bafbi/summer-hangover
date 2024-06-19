import React, { useEffect } from 'react';
import styles from '../../styles/Popup.module.css';

interface PopupProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      {message}
    </div>
  );
};
