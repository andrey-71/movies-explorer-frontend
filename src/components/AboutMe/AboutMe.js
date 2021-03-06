import './AboutMe.css';
import authorImage from '../../images/author_image.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__text-info'>
          <h3 className='about-me__info-name'>Виталий</h3>
          <p className='about-me__info-profession'>
            Фронтенд-разработчик, 30 лет
          </p>
          <p className='about-me__info-description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='about-me__link-social'
            href='https://rkn.gov.ru'
            target='_blank'
            rel='noreferrer noopener'
          >
            Facebook
          </a>
          <a
            className='about-me__link-social'
            href='https://github.com/andrey-71'
            target='_blank'
            rel='noreferrer noopener'
          >
            Github
          </a>
        </div>
        <img
          className='about-me__image-author'
          src={authorImage}
          alt='Фотография автора-разработчика'
        />
      </div>
    </section>
  )
}

export default AboutMe;