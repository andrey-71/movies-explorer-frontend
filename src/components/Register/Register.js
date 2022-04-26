import './Register.css';
import Authorization from '../Authorization/Authorization';

function Register(props) {
  const namePage = 'register'
  const title = 'Добро пожаловать';
  const submitTextButton = 'Зарегистрироваться'

  return (
    <section className='register'>
      <Authorization
        isRegister={props.isRegister}
        namePage={namePage}
        title={title}
        submitText={submitTextButton}
      />
    </section>
  )
}

export default Register;