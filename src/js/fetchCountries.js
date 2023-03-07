export default class NewCountryApiServise {
  constructor() {
    this.searchParametr = '';
  }

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchParametr}?fields=name,capital,population,flags,languages`
    )
      .then(responce => {
        if (!responce.ok) {
          throw new Error('Помилка!');
        }
        return responce.json();
      })
      .then(country => {
        return country;
      });
  }

  get country() {
    return this.searchParametr;
  }

  set country(newSearchParametr) {
    this.searchParametr = newSearchParametr;
  }
}
