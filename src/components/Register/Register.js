import './Register.css';
import Authorization from '../Authorization/Authorization';

function Register() {

  return (
    <section className='register'>
      <Authorization
        namePage='signup'
        redirectPath='/signin'
        title='Добро пожаловать!'
        submitTextButton='Зарегистрироваться'
      />
    </section>
  )
}

export default Register;