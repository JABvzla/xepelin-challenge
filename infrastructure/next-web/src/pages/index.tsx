import AccountInfo from "../components/account-info"
import AccountForm from "../components/account-form"
import Greeting from "../components/greeting"
import Layout from "../layout"

export default function Home() {
  const withAccount = true
  return (
    <>
      <Layout>
        <Greeting />
        {!withAccount && <AccountForm />}
        {withAccount && <AccountInfo />}
      </Layout>
    </>
  )
}
