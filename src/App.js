import React, { useState, useEffect } from 'react';

const weatherApi = {
  key: "197ff68a06770bd98f2e30fa40c639ac",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [wind, setWind] = useState({});
  const [error, setError] = useState(null);



  const search = evt => {
    if (evt.key === 'Enter') {
      setError(false);
      fetch(`${weatherApi.base}weather?q=${query}&units=metric&appid=${weatherApi.key}`)
        .then(res => {
          if (!res.ok) {
            throw Error('Could not fetch data for that resource')
          }
          return res.json();
        })
        .then(result => {
          setWeather(result);
          setQuery('');
          setWind(result);
          console.log(result);
        })
        .catch(err => {

          setError(err.message);

        });


    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <h1>Weather App</h1>
        <p>Write your favourite destination</p>
        <div className="fail">
          {error && <div>{error}</div>}

        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            maxLength="25"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}

          />

        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>

              <div className="date">{dateBuilder(new Date())}</div>

            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C

              </div>

              <div className="weather">
                {weather.weather[0].main}<br></br>
                {weather.weather[0].description}
              </div>
              <div className="windBox">Wind : {weather.wind.speed} m/s</div>
              <div className="humidity">
                <p>Humidity:{Math.round(weather.main.humidity)}%</p>
              </div>


            </div>
          </div>
        ) : (' ')}

      </main>
    </div>
  );
}

export default App;
