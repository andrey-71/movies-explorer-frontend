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
        isError={props.isError}
        onSubmit={props.onRegister}
      />
    </section>
  )
}

export default Register;