import './FilterCheckbox.css';

function FilterCheckbox(props) {

  return (
    <div className='filter-checkbox'>
      <label htmlFor='filterCheckbox' className='filter-checkbox__container'>
        <input type='checkbox' id='filterCheckbox' className='filter-checkbox__checkbox'/>
        <span className='filter-checkbox__custom-checkbox'>
        <i className='filter-checkbox__circle' />
      </span>
      </label>
      <p className='filter-checkbox__description'>{props.description}</p>
    </div>

  )
}
export default FilterCheckbox;