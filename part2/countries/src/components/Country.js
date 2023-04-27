
import { useEffect, useState } from "react";
import Weather from "./Weather";

const Country = ({country}) => {

    const languages = country.languages;
 
    return (
        <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        {Object.entries(languages).map(([code, name]) => (
            <li key={code}>{name}</li>))
        }
        <br />
        <img src={country.flags.png}></img>
        <Weather lat={country.latlng[0]} long={country.latlng[1]} capital={country.capital}/>
        </>
    )
}

export default Country