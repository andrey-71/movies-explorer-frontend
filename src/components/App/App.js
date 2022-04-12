import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className='page'>
      <Header />

      <main className='content page__content'>
        <Main />
      </main>

      <Footer />
    </div>
  );
}

export default App;
