import './Register.css';
import Authorization from '../Authorization/Authorization';

function Register() {
  const namePage = 'register'
  const title = 'Добро пожаловать!';
  const submitTextButton = 'Зарегистрироваться';

  return (
    <section className='register'>
      <Authorization
        namePage={namePage}
        title={title}
        submitTextButton={submitTextButton}
      />
    </section>
  )
}

export default Register;