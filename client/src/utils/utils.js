import {countries} from './constants';

export const getCountryCode = (country) => {
    try {
        return countries.find((c) => c.nat === country || c.nat.includes(country)).code
    } catch (error) {
        return null;
    }
}

export const getWikiUrl = (url) => {
    const search = url.split('/').pop() 
    return search
}