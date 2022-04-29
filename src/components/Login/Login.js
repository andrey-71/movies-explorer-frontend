import './Login.css';
import Authorization from "../Authorization/Authorization";

function Login() {
  const namePage = 'signin';
  const redirectPath = '/signup';
  const title = 'Рады видеть!';
  const submitTextButton = 'Войти'

  return (
    <section className='login'>
      <Authorization
        namePage={namePage}
        redirectPath={redirectPath}
        title={title}
        submitTextButton={submitTextButton}
      />
    </section>
  )
}

export default Login;