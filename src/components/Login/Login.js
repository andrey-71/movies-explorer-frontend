import './Login.css';
import Authorization from "../Authorization/Authorization";

function Login(props) {

  return (
    <section className='login'>
      <Authorization
        namePage='Login'
        redirectPath='/signup'
        title='Рады видеть!'
        submitTextButton='Войти'
        isError={props.isError}
        onSubmit={props.onLogin}
      />
    </section>
  )
}

export default Login;