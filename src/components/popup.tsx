import React, { useEffect } from 'react';
import styles from '../styles/popup.module.css';

interface PopupProps {
  message: string;
  type: 'success' | 'error' | null;
}

export const Popup: React.FC<PopupProps> = ({ message, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const popup = document.querySelector(`.${styles.popup}`);
      if (popup) {
        popup.remove();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.popup} ${type && styles[type]}`}>
      {message}
    </div>
  );
};