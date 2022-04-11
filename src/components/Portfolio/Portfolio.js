import './Portfolio.css';

function Portfolio() {

  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a href='#' className='portfolio__item-link'>Статичный сайт</a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a href='#' className='portfolio__item-link'>Адаптивный сайт</a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a href='#' className='portfolio__item-link'>Одностраничное приложение</a>
          <div className='portfolio__item-icon' />
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;