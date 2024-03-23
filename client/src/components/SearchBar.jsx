import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchTerm } from '../features/crypto/cryptoSlice';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSearchTerm(searchTerm));
  };

  return (
    <form
      className='py-4 w-3/4 sm:w-1/2 md:py-0 md:w-auto flex-1 flex rounded-xl bg-slate-300 mx-16 h-14'
      onSubmit={handleSubmit}>
      <SearchIcon className='h-6 my-auto px-3 text-zinc-500' />
      <input
        className='text-sm sm:text-md flex-1 bg-transparent outline-none'
        placeholder='Search Cryptogan...'
        type='text'
        value={searchTerm}
        onChange={handleChange}
      />
      <button hidden></button>
    </form>
  );
};

export default SearchBar;
