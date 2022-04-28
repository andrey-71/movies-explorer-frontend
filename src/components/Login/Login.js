import './Login.css';
import Authorization from "../Authorization/Authorization";

function Login() {

  const namePage = 'login'
  const title = 'Рады видеть!';
  const submitTextButton = 'Войти'

  return (
    <section className='login'>
      <Authorization
        namePage={namePage}
        title={title}
        submitTextButton={submitTextButton}
      />
    </section>
  )
}

export default Login;