const express = require('express');
const cryptoRouter = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
const coincapBaseUrl = 'http://api.coincap.io/v2';
const logos = {
  solana: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
  bitcoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  litecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
  dogecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  ethereum: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  cardano: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
  'bitcoin-cash': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png',
  'shiba-inu': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
  tezos: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png',
};

cryptoRouter.get('/', async (req, res, next) => {
  const endpoint = '/assets';
  const urlToFetch = coincapBaseUrl + endpoint;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const { data } = jsonResponse;
      const info = data.map((crypto) => ({
        priceUsd: crypto.priceUsd,
        dayChange: crypto.changePercent24Hr,
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        logo: logos[crypto.id] || 'no-logo',
      }));
      return res.status(200).send(info);
    }
    throw new Error('Request failed!');
  } catch (err) {
    res.status(500).send('Request failed!');
  }
});

module.exports = cryptoRouter;
