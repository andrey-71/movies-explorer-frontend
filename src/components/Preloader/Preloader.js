import './Preloader.css';

function Preloader(props) {

  return (
    <div className={!props.isPreloaderVisible ? 'preloader' : 'preloader preloader_visible'}>
      <span className='preloader__element' />
    </div>
  )
}

export default Preloader;