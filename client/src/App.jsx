import React from 'react';
import Header from './components/Header';
import Cryptos from './features/crypto/Cryptos';

const App = () => {
  return (
    <div className='font-righteous-cursive'>
      <Header />
      <Cryptos />
    </div>
  );
};

export default App;
