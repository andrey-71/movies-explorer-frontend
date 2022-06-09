import './Footer.css';

function Footer() {

  return (
    <footer className='footer page__footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__items'>
        <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li className='footer__link-item'>
            <a
              className='footer__link'
              href='https://praktikum.yandex.ru/'
              target='_blank'
              rel='noreferrer noopener'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__link-item'>
            <a
              className='footer__link'
              href='https://github.com/andrey-71'
              target='_blank'
              rel='noreferrer noopener'
            >
              Github
            </a>
          </li>
          <li className='footer__link-item'>
            <a
              className='footer__link'
              href='https://rkn.gov.ru'
              target='_blank'
              rel='noreferrer noopener'
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;