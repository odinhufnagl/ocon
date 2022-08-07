import { useEffect, useState } from 'react';
import { getCountries } from '../api/graphql/requests';

const useCountries = () => {
  const [countries, setCountries] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  useEffect(() => {
    (async () => {
      let countries = await getCountries();
      countries.unshift({ name: 'World', code: 'world' });
      setCountries(countries);
      setCurrentCountry(countries[0]);
    })();
  }, []);

  return [countries, currentCountry, setCurrentCountry];
};

export default useCountries;
