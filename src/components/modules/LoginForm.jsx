import styles from "./LoginForm.module.css";
import { useState } from "react";
import { useLogin } from "../../services/mutations";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { email, password } = form;
    console.log("email", email);
    console.log("pass", password);

    if (!email || !password)
      return alert("User Name and Password is Necessary");

    mutate(form, {
      onSuccess: (data) => {
        console.log("data in loginform", data);
        setCookie("token", data?.token);
        toast.success("ورود موفقیت امیز");
        navigate("/");
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <div className={styles.logoPart}>
        <span>فرم ورود</span>
      </div>
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={changeHandler}
        placeholder="ایمیل"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={changeHandler}
        placeholder="رمز عبور"
      />
      <button type="submit" className={styles.authBtn}>
        ورود
      </button>
    </form>
  );
};

export default LoginForm;
