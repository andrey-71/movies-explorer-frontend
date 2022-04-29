import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  function handleClickBackButton() {
    navigate(-1);
  }

  return (
    <section className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__description'>Страница не найдена</p>
      <button className='error-page__back-button' onClick={handleClickBackButton}>Назад</button>
    </section>
  )
}

export default NotFoundPage;