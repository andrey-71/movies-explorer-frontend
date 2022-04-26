import './Login.css';
import Authorization from "../Authorization/Authorization";

function Login(props) {

  const namePage = 'login'
  const title = 'Рады видеть!';
  const submitTextButton = 'Войти'

  return (
    <section className='login'>
      <Authorization
        isLogin={props.isLogin}
        namePage={namePage}
        title={title}
        submitText={submitTextButton}
      />
    </section>
  )
}

export default Login;