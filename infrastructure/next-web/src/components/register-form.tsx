import { useT } from "@/provider/language-context"
import axios from "axios"
import Link from "next/link"
import { User } from "../../../../domain/user"
import { Auth } from "../../../../domain/auth"
import getFormValue from "@/helper/get-form-value"
import { useAuth } from "@/provider/auth-context"

interface RegisterForm {
  name: User["name"]
  username: Auth["username"]
  password: Auth["password"]
  password_repeat: Auth["password"]
}
const RegisterForm = () => {
  const t = useT()
  const { login } = useAuth()
  const handleRegister = async () => {
    const fields = ["name", "username", "password", "password_repeat"]
    const body = getFormValue<RegisterForm>(fields)
    if (Object.keys(body).length !== fields.length) {
      console.log("%c⧭", "color: #aa00ff", "Todos los campos son requeridos")
      // TODO message
      return
    }

    if (body.password !== body.password_repeat) {
      console.log("%c⧭", "color: #e50000", "Las contraseñas no coinciden")
      // TODO message
      return
    }

    const response = await axios.post("/register", body)
    if (response.data && response?.data?.access_token) {
      login(response.data.access_token)
    }
  }

  return (
    <div className="form">
      <label>
        {t("name")}
        <input type="text" placeholder={t("name")} id="name" />
      </label>
      <label>
        {t("username")}
        <input type="text" placeholder={t("username")} id="username" />
      </label>
      <label>
        {t("password")}
        <input type="password" placeholder={t("password")} id="password" />
      </label>
      <label>
        {t("password_repeat")}
        <input type="password" placeholder={t("password_repeat")} id="password_repeat" />
      </label>
      <input type="button" value={t("register")} onClick={handleRegister} />
      <Link href="/login">{t("yes_registered")}</Link>
    </div>
  )
}
export default RegisterForm
