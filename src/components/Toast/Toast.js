import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastNotification } from 'carbon-components-react';

const NOTIFICATION_HAS_BEEN_SEEN = 'notificationHasBeenSeen';

export const Toast = ({
  caption,
  children,
  className,
  hideAfterFirstDisplay,
  hideCloseButton,
  iconDescription,
  kind,
  lowContrast,
  onCloseButtonClick,
  role,
  subtitle,
  timeout,
  title,
}) => {
  const [id, setId] = useState();
  const [hideToast, setHideToast] = useState(false);

  useEffect(() => {
    setId(
      Math.random()
        .toString(36)
        .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
    );
  }, []);

  useEffect(() => {
    const element = document.querySelector(`.custom-toast-${id}`);
    if (element) {
      element.className += 'enter';
    }
  }, [id]);

  useEffect(() => {
    if (
      hideAfterFirstDisplay &&
      typeof window !== undefined &&
      typeof window.localStorage !== undefined &&
      window.localStorage.getItem(NOTIFICATION_HAS_BEEN_SEEN) === 'true'
    ) {
      setHideToast(true);
    }
  }, [hideAfterFirstDisplay]);

  return hideToast ? null : (
    <ToastNotification
      caption={caption}
      className={`custom-toast-${id} ${className}`}
      hideCloseButton={hideCloseButton}
      iconDescription={iconDescription}
      kind={kind}
      lowContrast={lowContrast}
      onCloseButtonClick={() => {
        if (
          hideAfterFirstDisplay &&
          typeof window !== undefined &&
          typeof window.localStorage !== undefined
        ) {
          window.localStorage.setItem(NOTIFICATION_HAS_BEEN_SEEN, 'true');
        }
        onCloseButtonClick();
      }}
      role={role}
      subtitle={subtitle}
      timeout={timeout}
      title={title}
    >
      {children}
    </ToastNotification>
  );
};

Toast.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  hideAfterFirstDisplay: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  iconDescription: PropTypes.string,
  kind: PropTypes.string,
  lowContrast: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  role: PropTypes.string,
  subtitle: PropTypes.string,
  timeout: PropTypes.number,
  title: PropTypes.string,
};

Toast.defaultProps = {
  caption: '',
  children: null,
  className: '',
  hideAfterFirstDisplay: true,
  hideCloseButton: false,
  iconDescription: 'closes notification',
  kind: 'error',
  lowContrast: false,
  onCloseButtonClick: () => {},
  role: 'alert',
  subtitle: '',
  timeout: 0,
  title: '',
};

export default Toast;
