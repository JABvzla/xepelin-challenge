import getFormValue from "@/helper/get-form-value"
import axios from "axios"
import Link from "next/link"
import { Auth } from "../../../../domain/auth"
import { useT } from "../provider/language-context"
import { useAuth } from "@/provider/auth-context"
import { showWarning } from "@/helper/toast"
import { useLoader } from "@/provider/loader-context"

interface LoginForm {
  username: Auth["username"]
  password: Auth["password"]
}

const LoginForm = () => {
  const t = useT()
  const { login } = useAuth()
  const { hide } = useLoader()
  const handleLogin = async () => {
    const fields = ["username", "password"]
    const body = getFormValue<LoginForm>(fields)
    if (Object.keys(body).length !== fields.length) {
      showWarning(t("field_required"))
      return
    }
    const response = await axios.post("/login", body)
    if (response?.data && response?.data?.access_token) {
      login(response.data.access_token)
      return
    }
    hide()
  }

  return (
    <div className="form">
      <label>
        {t("username")}
        <input type="text" placeholder={t("username")} id="username" />
      </label>
      <label>
        {t("password")}
        <input type="password" placeholder={t("password")} id="password" />
      </label>
      <input type="button" value={t("login")} onClick={handleLogin} />
      <Link href="/register">{t("not_registered")}</Link>
    </div>
  )
}
export default LoginForm
