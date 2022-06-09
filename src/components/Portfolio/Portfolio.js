import './Portfolio.css';

function Portfolio() {

  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='https://github.com/andrey-71/how-to-learn'
            target='_blank'
            rel='noreferrer noopener'
          >
            Статичный сайт
          </a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='https://github.com/andrey-71/russian-travel'
            target='_blank'
            rel='noreferrer noopener'
          >
            Адаптивный сайт
          </a>
          <div className='portfolio__item-icon' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__item-link'
            href='https://github.com/andrey-71/react-mesto-auth'
            target='_blank'
            rel='noreferrer noopener'
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