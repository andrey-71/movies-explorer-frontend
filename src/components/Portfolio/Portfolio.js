import './Portfolio.css';

function Portfolio() {

  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='#'
            target='_blank'
          >
            Статичный сайт
          </a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='#'
            target='_blank'
          >
            Адаптивный сайт
          </a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='#'
            target='_blank'
          >
            Одностраничное приложение
          </a>
          <div className='portfolio__item-icon' />
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;