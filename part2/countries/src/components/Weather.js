import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({lat, long, capital}) => {

    const latitude = lat
    const longitude = long
    const apiKey = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    useEffect(() => {
        console.log("fetching data")
        axios
          .get(weatherUrl)
          .then((response) => {
            setWeather(response.data)
            setIcon(response.data.weather[0].icon)
            console.log(response.data)
          })
    }, [])

    if(!weather) {
        return <p>Cannot find weather data</p>
    }

    return (
        <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={iconUrl} ></img>
        <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather