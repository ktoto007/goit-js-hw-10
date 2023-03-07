import './css/styles.css';
import NewCountryApiServise from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const fetchCountry = new NewCountryApiServise();

refs.searchBox.addEventListener(
  'input',
  debounce(responseToRequest, DEBOUNCE_DELAY)
);

function responseToRequest() {
  fetchCountry.country = refs.searchBox.value.trim();
  if (fetchCountry.country !== '') {
    fetchCountry
      .fetchCountries()
      .then(country => {
        const length = country.length;
        if (length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (length == 1) {
          refs.countryList.innerHTML = '';
          refs.countryInfo.innerHTML = countryMapDrawing(country[0]);
        }
        if (length > 1 && length < 10) {
          refs.countryList.innerHTML = DrawingListOfCountries(country);
          refs.countryInfo.innerHTML = '';
        }
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function countryMapDrawing(country) {
  return `
     <div>
      <span class='flagWithName'><img src='${
        country.flags.svg
      }' width='50px' heigth='50px'alt='${country.flags.alt}' />
        <h2>${country.name.official}</h2></span>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages)}</p>
    </div>`;
}

function DrawingListOfCountries(country) {
  const markup = [];
  for (i = 0; i < country.length; i += 1) {
    markup.push(`
    <li>
      <span class='flagWithName'><img src='${country[i].flags.svg}' width='50px' heigth='50px'alt='${country[i].flags.alt}' />
        <h2>${country[i].name.official}</h2></span>
    </li>`);
  }

  return markup.join('');
}
