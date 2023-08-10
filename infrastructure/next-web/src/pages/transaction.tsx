import Greeting from "../components/greeting"
import TransactionForm from "../components/transaction-form"
import Layout from "../layout"


export default function Page() {
  return (
    <>
      <Layout>
        <Greeting />
        <TransactionForm />
      </Layout>
    </>
  )
}

