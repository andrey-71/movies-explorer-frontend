import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'
              name='form-search'
              onSubmit={props.onSearchMovies}>
          <div className='search__icon' />
          <input
            type='text'
            placeholder='Фильм'
            className='search__input'
            name='dataSearch'
            value={props.dataSearch ?? ''}
            onChange={props.onChangeDataSearch}
          />
          <button className='search__button' type='submit'>
            <span className='search__button-icon' />
          </button>
        </form>
        <FilterCheckbox
          description='Короткометражки'
          isFilterShortMovies={props.isFilterShortMovies}
          onFilteredShortMovies={props.onFilteredShortMovies}
        />
      </div>
    </section>
  )
}

export default SearchForm;