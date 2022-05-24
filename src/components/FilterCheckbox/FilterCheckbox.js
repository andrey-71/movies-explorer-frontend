import './FilterCheckbox.css';

function FilterCheckbox(props) {

  // Функция состояния фильтра короткометражных фильмов и запись в localStorage
  function handleFilterShortMoviesState() {
    props.setIsFilterShortMovies(!props.isFilterShortMovies);
    localStorage.setItem('filterShortMovies', JSON.stringify(!props.isFilterShortMovies));
  }

  return (
    <div className='filter-checkbox'>
      <label htmlFor='filterCheckbox' className='filter-checkbox__container'>
        <input
          type='checkbox'
          id='filterCheckbox'
          className='filter-checkbox__checkbox'
          checked={props.isFilterShortMovies !== null && props.isFilterShortMovies}
          onChange={handleFilterShortMoviesState}
        />
        <span className='filter-checkbox__custom-checkbox'>
        <i className='filter-checkbox__circle' />
      </span>
      </label>
      <p className='filter-checkbox__description'>{props.description}</p>
    </div>

  )
}
export default FilterCheckbox;