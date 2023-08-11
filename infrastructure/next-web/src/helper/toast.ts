import { toast } from "react-toastify"

export const showError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    draggable: true,
    theme: "light",
  })

export const showWarning = (message: string) =>
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    draggable: true,
    theme: "light",
  })
