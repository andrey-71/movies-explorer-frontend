import './Register.css';
import Authorization from '../Authorization/Authorization';

function Register() {
  const namePage = 'signup'
  const redirectPath = '/signin';
  const title = 'Добро пожаловать!';
  const submitTextButton = 'Зарегистрироваться';

  return (
    <section className='register'>
      <Authorization
        namePage={namePage}
        redirectPath={redirectPath}
        title={title}
        submitTextButton={submitTextButton}
      />
    </section>
  )
}

export default Register;