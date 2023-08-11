import { ToastOptions, toast } from "react-toastify"

const config: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  pauseOnHover: true,
  hideProgressBar: true,
  closeOnClick: true,
  progress: undefined,
  draggable: true,
  theme: "light",
}
export const showError = (message: string) =>{
  if(!message) return;
  toast.error(message, config)
}

export const showWarning = (message: string) =>{
  if(!message) return;
  toast.warning(message, config)
}