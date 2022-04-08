import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  return (
    <div className='page'>
      <Header />

      <main className='content page__content'>
        <Main />
      </main>
    </div>
  );
}

export default App;
