import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  // Обработчики изменения инпута
  function handleChangeDataSearch(evt) {
    props.setDataSearch(evt.target.value);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'
              name='form-search'
              onSubmit={props.onClick}>
          <div className='search__icon' />
          <input
            type='text'
            placeholder='Фильм'
            className='search__input'
            name='dataSearch'
            value={props.dataSearch}
            onChange={handleChangeDataSearch}
          />
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