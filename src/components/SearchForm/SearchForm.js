import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__icon' />
        <input type='text' placeholder='Фильмы' className='search-form__input'/>
        <button className='search-form__button'></button>
        <FilterCheckbox />

      </div>
    </section>
  )
}

export default SearchForm;