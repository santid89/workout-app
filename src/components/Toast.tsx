import { useEffect, useState } from 'react';
import { useToastStore, type ToastData } from '@/store/toastStore';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: ToastData }) {
  const remove = useToastStore((s) => s.remove);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const hideTimer = setTimeout(() => setShow(false), 2600);
    const removeTimer = setTimeout(() => remove(toast.id), 2600 + 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, remove]);

  return (
    <div
      className={'toast ' + toast.kind + (show ? ' show' : '')}
    >
      {toast.msg}
    </div>
  );
}
