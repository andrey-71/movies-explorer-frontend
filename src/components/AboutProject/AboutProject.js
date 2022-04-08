import './AboutProject.css';

function AboutProject() {
  return(
    <section className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__info'>
        <div>
          <h3 className='about-project__item-title'>
            Дипломный проекти включал 5 этапов
          </h3>
          <p className='about-project__item-description'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <h3 className='about-project__item-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__item-description'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__stages'>
        <div className='about-project__stage-week about-project__stage-week_backend'>
          <span>1 неделя</span>
        </div>
        <div className='about-project__stage-week'>
          <span>4 недели</span>
        </div>
        <p className='about-project__stage-description'>Back-end</p>
        <p className='about-project__stage-description'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;