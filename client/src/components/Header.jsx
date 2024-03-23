import { useState } from 'react';
import { useEffect } from 'react';
import logo from '../images/cryptogan.svg';
import SearchBar from './SearchBar';

const Header = () => {
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setFloating(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={`flex flex-col md:flex-row py-5 sticky top-0 bg-white duration-300 items-center ${
        floating && 'py-3 bg-slate-200 bg-opacity-75'
      }`}>
      <div className='flex ml-5 space-x-5 items-center'>
        <img className={`h-24 duration-300 ${floating && 'h-16'}`} src={logo} alt='' />
        <div className='hidden sm:block text-3xl'>CRYPTOGAN</div>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
