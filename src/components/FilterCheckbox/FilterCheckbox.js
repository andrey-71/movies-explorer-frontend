import './FilterCheckbox.css';

function FilterCheckbox() {

  return (
    <label htmlFor='filterCheckbox' className='filter-checkbox'>
      <input type='checkbox' id='filterCheckbox' className='filter-checkbox__checkbox'/>
      <span className='filter-checkbox__custom-checkbox'>
        <i className='filter-checkbox__circle' />
      </span>
    </label>
  )
}
export default FilterCheckbox;