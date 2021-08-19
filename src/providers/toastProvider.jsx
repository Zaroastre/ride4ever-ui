import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';

const ToastProvider = () => {
  const toast = useRef(null);
  const isShow = useSelector((state) => state.toast.isShow);
  const severity = useSelector((state) => state.toast.severity);
  const summary = useSelector((state) => state.toast.summary);
  const detail = useSelector((state) => state.toast.detail);

  useEffect(() => {
    if (isShow) {
      toast.current.show({
        severity,
        summary,
        detail,
      });
    }
  }, [isShow, severity, summary, detail]);

  return <Toast ref={toast} baseZIndex={10000} />;
};

export default ToastProvider;
