import PropTypes from 'prop-types';
import { PhotographIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { SwitchHorizontalIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const Crypto = ({ data }) => {
  const [opened, setOpened] = useState(false);
  const [usdValue, setUsdValue] = useState('');
  const [cryptoValue, setCryptoValue] = useState('');
  const [changed, setChanged] = useState('usd');

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  const handleChangeUsd = (e) => {
    setUsdValue(e.target.value);
    setChanged('usd');
  };
  const handleChangeCrypto = (e) => {
    setCryptoValue(e.target.value);
    setChanged('crypto');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usd = document.getElementById(`usd${data.symbol}`);
    const crypto = document.getElementById(data.symbol);
    if (changed === 'usd') {
      crypto.value = usdValue / price;
    }
    if (changed === 'crypto') {
      usd.value = cryptoValue * price;
    }
  };
  const price =
    data.priceUsd > 1000
      ? Math.floor(data.priceUsd * 100) / 100
      : data.priceUsd > 100
      ? Math.floor(data.priceUsd * 10000) / 10000
      : data.priceUsd > 10
      ? Math.floor(data.priceUsd * 100000) / 100000
      : data.priceUsd > 1
      ? Math.floor(data.priceUsd * 10000000) / 10000000
      : data.priceUsd;
  const change =
    data.dayChange > 1000 || data.dayChange < -1000
      ? Math.floor(data.dayChange * 100) / 100
      : data.dayChange > 100 || data.dayChange < -100
      ? Math.floor(data.dayChange * 10000) / 10000
      : data.dayChange > 10 || data.dayChange < -10
      ? Math.floor(data.dayChange * 100000) / 100000
      : data.dayChange > 1 || data.dayChange < -1
      ? Math.floor(data.dayChange * 10000000) / 10000000
      : data.dayChange > 0.5 || data.dayChange < -0.5
      ? Math.floor(data.dayChange * 1000000000) / 1000000000
      : data.dayChange;
  return (
    <div className='flex flex-col space-y-3 bg-slate-100 w-full max-w-5xl rounded-md duration-200'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <div className='h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center'>
            {data.logo !== 'no-logo' ? (
              <img className='h-12 sm:h-14 rounded-full' src={data.logo} alt='' />
            ) : (
              <PhotographIcon className='h-14' />
            )}
          </div>
          <div className='px-4 py-2 flex items-center text-2xl'>
            <span className='text-sm sm:text-md'>{data.name}</span>
          </div>
        </div>
        <div className='flex'>
          <div className='hidden md:flex flex-col px-4 py-2 items-end justify-center space-y-2 '>
            <div className='flex space-x-3 items-center'>
              <span className='text-4xl'>$</span>
              <span className='text-xl'>{price}</span>
            </div>
            <div>
              <span className={`text-sm ${data.dayChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {`${data.dayChange > 0 ? '+' : ''}${change}%`}
              </span>
            </div>
          </div>
          <div className='flex items-center mx-4'>
            <button onClick={handleClick} className='p-2'>
              {opened ? (
                <ChevronUpIcon className='h-8 text-zinc-400' />
              ) : (
                <ChevronDownIcon className='h-8 text-zinc-400' />
              )}
            </button>
          </div>
        </div>
      </div>
      {opened && (
        <div className='px-4 py-2 flex flex-col space-y-10 items-center'>
          <div className='flex md:hidden flex-col px-4 py-2 items-end justify-center space-y-2 '>
            <div className='flex space-x-3 items-center'>
              <span className='text-4xl'>$</span>
              <span className='text-xl'>{price}</span>
            </div>
            <div>
              <span className={`text-sm ${data.dayChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {`${data.dayChange > 0 ? '+' : ''}${change}%`}
              </span>
            </div>
          </div>
          <div className='flex space-x-8 items-center justify-center'>
            <div>
              <span>USD</span>
            </div>
            <SwitchHorizontalIcon className='h-6' />
            <div>{data.symbol}</div>
          </div>
          <form className='flex flex-col space-y-5 pb-5' onSubmit={handleSubmit}>
            <div className='flex space-x-5 items-center'>
              <input
                onChange={handleChangeUsd}
                value={usdValue}
                className='outline-none rounded-lg text-xl w-28 py-1 px-2'
                id={`usd${data.symbol}`}
                type='number'
                step='0.000000000000000001'
              />
              <SwitchHorizontalIcon className='h-6' />
              <input
                onChange={handleChangeCrypto}
                value={cryptoValue}
                className='outline-none rounded-lg text-xl w-28 py-1 px-2'
                id={data.symbol}
                type='number'
                step='0.000000000000000001'
              />
            </div>
            <button className='py-1 px-2 rounded-md bg-yellow-100'>Convert</button>
          </form>
        </div>
      )}
    </div>
  );
};

Crypto.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Crypto;
