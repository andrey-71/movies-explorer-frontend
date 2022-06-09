import './SearchForm.css';
import { useForm } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  // Hook-form валидация
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  // Сабмит формы
  function onSubmit() {
    props.onSearchMovies(getValues().search);
    reset({
      isValid: true,
    })
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'
              name='form-search'
              noValidate={true}
              onSubmit={handleSubmit(onSubmit)}>
          <div className='search__icon' />
          <label className='search__input-container'>
            <input
              type='text'
              placeholder='Фильм'
              className='search__input'
              name='dataSearch'
              defaultValue={props.dataSearch ?? ''}
              {...register('search', {
                required: 'Нужно ввести ключевое слово',
              })}
            />
            <span className={`search__input-error ${!isValid && `search__input-error_visible`}`}>
              {errors?.search?.message || ''}
            </span>
          </label>
          <button
            className={`search__button ${!isValid && 'search__button_disabled'}`}
            type='submit'
            disabled={!isValid}>
            <span className='search__button-icon' />
          </button>
        </form>
        <FilterCheckbox
          description='Короткометражки'
          isFilterShortMovies={props.isFilterShortMovies}
          onFoundFiltered={props.onFoundFiltered}
          onClickFiltered={props.onClickFiltered}
        />
      </div>
    </section>
  )
}

export default SearchForm;