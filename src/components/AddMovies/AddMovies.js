import './AddMovies.css';
import {useState, useEffect} from 'react';
import Preloader from "../Preloader/Preloader";

function AddMovies() {
  const [isAddMoviesButtonClick, setIsAddMoviesButtonClick] = useState(false);

  function handleAddMoviesButtonClick() {
    setIsAddMoviesButtonClick(!isAddMoviesButtonClick);
  }

  // Временное решение
  function disablePreloaderOnTimeout() {
    setTimeout(handleAddMoviesButtonClick, 1500);
  }

  useEffect(() => {
    isAddMoviesButtonClick && disablePreloaderOnTimeout();
  }, [isAddMoviesButtonClick]);

  return (
    <>
      <section className={!isAddMoviesButtonClick ? 'add-movies'
        : 'add-movies add-movies_invisible'}>
        <button
          className='add-movies__button'
          onClick={handleAddMoviesButtonClick}
        >
          Ещё
        </button>
      </section>
      <Preloader isVisible={isAddMoviesButtonClick}/>
    </>

  )
}

export default AddMovies;