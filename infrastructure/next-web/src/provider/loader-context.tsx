import { showError } from "@/helper/toast"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import debounce from "../helper/debounce"
import { useLanguage, useT } from "./language-context"

interface LoaderValue {
  isLoading: Boolean
  show: () => void
  hide: () => void
}
const LoaderContext = createContext<LoaderValue>({ isLoading: true, show: () => {}, hide: () => {} })

interface Props extends React.PropsWithChildren {}
export default function LoaderProvider(props: Props) {
  const [loader, setLoader] = useState<boolean>(false)
  const [minLoader, setMinLoader] = useState<boolean>(true)
  const hideMin = debounce(() => setMinLoader(false), 600)
  const t = useT();

  useEffect(() => {
    if (minLoader) {
      hideMin()
    }
  }, [minLoader, hideMin])

  const show = () => {
    setMinLoader(true)
    setLoader(true)
  }
  const hide = () => {
    setLoader(false)
  }
  const isLoading = loader || minLoader
  const value = { isLoading, show, hide }

  axios.interceptors.request.use((config) => {
    show()
    return config
  })

  axios.interceptors.response.use(
    (r) => r,
    (error) => {
      if (error?.response?.status === 400 && error?.response?.data?.message) {
        const message = t(error?.response?.data?.message) || error?.response?.data?.message;
        showError(message)
      }
      if(error?.code === "ERR_NETWORK") {
        showError('Network Error')
      }
      return error;
    }
  )
  return (
    <LoaderContext.Provider value={value}>
      {props.children}
      {isLoading && (
        <div className="absolute-center">
          <p className="fw-b fs-xxxl fc-white">XEPELIN</p>
        </div>
      )}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => useContext(LoaderContext)
