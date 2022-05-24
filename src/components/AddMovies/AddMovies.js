import './AddMovies.css';
import Preloader from "../Preloader/Preloader";

function AddMovies(props) {

  return (
    <>
      <section className={!props.isPreloaderVisible ? 'add-movies'
        : 'add-movies add-movies_invisible'}>
        <button
          className='add-movies__button'
          onClick={props.onClick}
        >
          Ещё
        </button>
      </section>
      <Preloader isPreloaderVisible={props.isPreloaderVisible} />
    </>

  )
}

export default AddMovies;