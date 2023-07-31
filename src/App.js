import axios from "axios";
import { useState } from "react";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=01ca823e7d1c3354f8c52664653b2a3e`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setError(false);
        setData(res.data);
      
      }).catch (err =>{
        setError(true)
      });
      setLocation('');
    }
  };
  

  
  const container = <div className='container'>
  <div className="top">
    <div className="location">
      <p>{data.name}</p>
    </div>
    <div className="temp">
      <h1>{data.main ? data.main.temp.toFixed() : null}°F</h1>
    </div>
    <div className="description">
      <p>{data.weather ? data.weather[0].main : null}</p>
    </div>
  </div>
  <div className="bottom">
      <div className="feels">
        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
        <p>Humidity</p>
      </div>
      <div className="wind">
        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
        <p>Wind Speed</p>
      </div>
    </div>
</div>
  return (
    <div className={`app ${data.weather && !error && data.weather[0].main}`}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {!error ? (Object.keys(data).length !== 0 && container) : <h2 className="error">Invalid input</h2>}
    </div>
  );
}

export default App;
