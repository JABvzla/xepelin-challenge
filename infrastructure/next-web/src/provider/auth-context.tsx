import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useState } from "react"

export interface AuthValue {
  accessToken: string | null
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthValue>({
  accessToken: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

interface Props extends React.PropsWithChildren {}
export default function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const login = (token: string) => {
    setAccessToken(token)
    sessionStorage.setItem("access_token", token)
  }
  const logout = () => {
    setAccessToken(null)
    sessionStorage.removeItem("access_token")
  }
  const isLoggedIn = Boolean(accessToken)

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      setAccessToken(storedToken)
    }
  }, [isLoggedIn])

  const router = useRouter()
  useEffect(() => {  
    const insecurePaths = ["/login", "/register"]
    const isInsecurePath = insecurePaths.some((p) => p === router.pathname)
    if (!isLoggedIn && !isInsecurePath) {
      router.push("/login")
      return
    }
    if (isLoggedIn && isInsecurePath) {
      router.push("/")
      return
    }
  }, [isLoggedIn, router])

  axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if(error?.response?.status === 401) {
        logout();
        return;
      }
      if (error.response) {
        console.log('%c⧭', 'color: #e57373', error);
        // console.log('%c⧭', 'color: #ace2e6', error.response.data);
        return error
      } 
      if (error.request) {
        console.log('%c⧭', 'color: #ff0000', 'No se recibió respuesta del servidor');
        return 'timeout'
      } 
  
      console.log('%c⧭', 'color: #9c66cc', error.message);
      return error
    }
  );

  return <AuthContext.Provider value={{ accessToken, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return useContext(AuthContext)
}
