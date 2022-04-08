import './Promo.css';
import promoImage from '../../images/promo_image.png';

function Promo() {

  return(
    <section className='promo'>
      <div className='promo__info'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__description'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <img
          className='promo__image'
          src={promoImage}
          alt='Земной шар с континетами из надписей web'
        />
      </div>
      <button className='promo__button'>Узнать больше</button>
    </section>
  )
}

export default Promo;