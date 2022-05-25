import './Login.css';
import Authorization from "../Authorization/Authorization";

function Login(props) {
  const namePage = 'signin';
  const redirectPath = '/signup';
  const title = 'Рады видеть!';
  const submitTextButton = 'Войти'

  // Отправка формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin();
  }

  return (
    <section className='login'>
      <Authorization
        namePage={namePage}
        redirectPath={redirectPath}
        title={title}
        submitTextButton={submitTextButton}
        onClick={handleSubmit}
      />
    </section>
  )
}

export default Login;