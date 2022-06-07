import './Register.css';
import Authorization from '../Authorization/Authorization';

function Register(props) {

  return (
    <section className='register'>
      <Authorization
        namePage='Register'
        redirectPath='/signin'
        title='Добро пожаловать!'
        submitTextButton='Зарегистрироваться'
        onSubmit={props.onRegister}
      />
    </section>
  )
}

export default Register;