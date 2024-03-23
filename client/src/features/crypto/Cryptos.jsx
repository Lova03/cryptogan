import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Crypto from '../../components/Crypto';
import { fetchCryptos, selectFilteredCryptos, selectHasError, selectIsLoading } from './cryptoSlice';

const Cryptos = () => {
  const dispatch = useDispatch();

  const cryptos = useSelector(selectFilteredCryptos);
  const hasError = useSelector(selectHasError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);
  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error</div>;

  return (
    <div className='flex flex-col space-y-8 items-center mb-8'>
      {cryptos.map((crypto) => {
        return <Crypto data={crypto} key={crypto.id} />;
      })}
    </div>
  );
};

export default Cryptos;
