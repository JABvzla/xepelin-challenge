import TransactionChart from "@/components/transaction-chart"
import axios from "axios"
import { useEffect, useState } from "react"
import AccountForm from "../components/account-form"
import AccountInfo from "../components/account-info"
import Greeting from "../components/greeting"
import TransactionList from "../components/transaction-list"
import { UserDetail } from "../../../../application/get-user-detail"
import Layout from "../layout"
import { useLoader } from "@/provider/loader-context"

export default function Page() {
  const [userDetail, setUserDetail] = useState<UserDetail>()
  const { show, hide, isLoading } = useLoader()
  useEffect(() => {
    show()
    const getUserDetail = async () => {
      const response = await axios.get("/user-detail")
      if (!response?.data) return
      setUserDetail(response.data)
      hide()
    }
    getUserDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const withAccount = userDetail?.account
  const withTransactions = userDetail?.account?.transactions?.length
  return (
    <>
      <Layout>
        <Greeting />
        {!withAccount && <AccountForm />}
        {withAccount && <AccountInfo />}
        {withTransactions && <TransactionChart />}
        {withTransactions && <TransactionList />}
      </Layout>
    </>
  )
}
