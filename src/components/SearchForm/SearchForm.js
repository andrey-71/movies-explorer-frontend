import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__search-container'>
          <div className='search-form__icon' />
          <input type='text' placeholder='Фильм' className='search-form__input' />
          <button className='search-form__button'>
            <span className='search-form__button-icon' />
          </button>
        </div>
        <FilterCheckbox description='Короткометражки' />
      </div>
    </section>
  )
}

export default SearchForm;