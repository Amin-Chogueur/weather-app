import search_icon from "../assets/search.png";
import cloudy_icon from "../assets/cloudy.png";
import partly_cloudy_icon from "../assets/partly-cloudy.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import suny_icon from "../assets/suny.png";
import humidity_icon from "../assets/humidity .png";
import wind_icon from "../assets/wind.png";
import { useEffect, useRef, useState } from "react";

const KEY = "e7165e0c61dda8064e3c5a9c14763a38";
const allIcons = {
  "01d": suny_icon,
  "01n": suny_icon,
  "02d": cloudy_icon,
  "02n": cloudy_icon,
  "03d": cloudy_icon,
  "03n": cloudy_icon,
  "04d": partly_cloudy_icon,
  "04n": partly_cloudy_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
};
function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const cityRef = useRef();

  async function fetchData(city) {
    if (city === "") return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
      );
      if (!res.ok) throw new Error("city not found");
      const data = await res.json();
      const weatherIcon = allIcons[data.weather[0].icon] || suny_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempurture: Math.floor(data.main.temp),
        location: data.name,
        icon: weatherIcon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  }
  useEffect(function () {
    fetchData("tlemcen");
  }, []);

  function handleSubmit(e, cityRef) {
    e.preventDefault();
    fetchData(cityRef.current.value);
    cityRef.current.value = "";
  }
  return (
    <div className="search-bar">
      <form onSubmit={(e) => handleSubmit(e, cityRef)}>
        <input type="text" ref={cityRef} placeholder="search"></input>

        <img
          className="search-icon"
          src={search_icon}
          alt="search"
          onClick={() => fetchData(cityRef.current.value)}
        ></img>
      </form>
      {weatherData ? (
        <div className="weather-data">
          <div className="weather-icon">
            <img className="icon" src={weatherData?.icon} alt="sunny"></img>
          </div>
          <div className="temperture">
            <p>{weatherData?.tempurture}°c</p>
            <p>{weatherData?.location}</p>
          </div>
          <div className="wind-hunidity">
            <div className="col">
              <img src={wind_icon} className="icon-data" alt="wind"></img>
              <p>{weatherData?.windSpeed} KM/H</p>
              <span>wind speed</span>
            </div>
            <div className="col">
              <img
                src={humidity_icon}
                className="icon-data"
                alt="humidity"
              ></img>
              <p>{weatherData?.humidity}%</p>
              <span>humidity</span>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ margin: "20px", textAlign: "center" }}>
          Oops! city not found{" "}
        </p>
      )}
    </div>
  );
}

export default Weather;
