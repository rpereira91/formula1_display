import {countries} from './constants';

export const getCountryCode = (country) => {
    try {
        return countries.find((c) => c.nat === country || c.nat.includes(country)).code
    } catch (error) {
        return null;
    }
}