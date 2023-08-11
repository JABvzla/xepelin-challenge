import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { UserDetail } from "../../../../application/get-user-detail"
import { useLoader } from "./loader-context"

interface UserDetailValue {
  userDetail: UserDetail | undefined
  fetchUserDetail: () => Promise<void>
}
const UserDetailContext = createContext<UserDetailValue>({ userDetail: undefined, fetchUserDetail: async () => {} })

interface Props extends React.PropsWithChildren {}
export default function UserDetailProvider(props: Props) {
  const [userDetail, setUserDetail] = useState<UserDetail>()
  const { show, hide } = useLoader()
  const fetchUserDetail = async () => {
    const response = await axios.get("/user-detail")
    if (!response?.data) {
      hide()
      return
    }
    setUserDetail(response.data)
    hide()
  }
  useEffect(() => {
    show()
    fetchUserDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = { userDetail, fetchUserDetail }
  return <UserDetailContext.Provider value={value}>{props.children}</UserDetailContext.Provider>
}

export const useUserDetail = () => useContext(UserDetailContext)
