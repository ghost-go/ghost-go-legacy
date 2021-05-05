import { toast, ToastOptions, Slide } from "react-toastify";

const DEFAULT_PARAMS: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const show = (msg: string, duration: number = 3000) => {
  toast(msg, {
    ...DEFAULT_PARAMS,
    autoClose: duration,
  });
};

export const info = (msg: string, duration: number = 3000) => {
  toast.info(msg, {
    ...DEFAULT_PARAMS,
    autoClose: duration,
  });
};

export const success = (msg: string, duration: number = 2000) => {
  toast.success(msg, {
    ...DEFAULT_PARAMS,
    autoClose: duration,
  });
};

export const error = (msg: string, duration: number = 3000) => {
  toast.error(msg, {
    ...DEFAULT_PARAMS,
    autoClose: duration,
  });
};
