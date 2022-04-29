import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form' name='form-search'>
          <div className='search__icon' />
          <input type='text' placeholder='Фильм' className='search__input' />
          <button className='search__button' type='submit'>
            <span className='search__button-icon' />
          </button>
        </form>
        <FilterCheckbox description='Короткометражки' />
      </div>
    </section>
  )
}

export default SearchForm;