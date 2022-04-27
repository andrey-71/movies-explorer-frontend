import './NotFoundPage.css';

function NotFoundPage() {

  return (
    <section className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__description'>Страница не найдена</p>
      <a href='#' className='error-page__navigate'>Назад</a>
    </section>
  )
}

export default NotFoundPage;