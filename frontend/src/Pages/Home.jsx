// import { use, useContext, useEffect, useState } from "react";
// import React from "react";
// import axios from "axios";
// import SearchBar from "../Components/Searchbar";
// import { ForecastContext } from "../context/ForecastContext";
// import { WiThermometer, WiCloud, WiStrongWind, WiDaySunny } from "react-icons/wi";
// import { useNavigate } from "react-router-dom";
// import './home.css';
// import Footer from "../Components/Footer";
// import { toast } from "react-toastify";

// const Home = () => {
//   const { forecast, setForecast , city,setCity,loader,setLoader,oneCityData} = useContext(ForecastContext);
//     const navigate = useNavigate();
//     useEffect(() => {
//       if(localStorage.getItem("city") || localStorage.getItem("local") || localStorage.getItem("data")){
//         localStorage.removeItem("city");
//         localStorage.removeItem("local");
//         localStorage.removeItem("data");
//       }
//     },[])
//   const handleSearch = async (cityName) => {
//     if (!cityName) {
//       return;
//     }
//     try {
//         setCity(cityName);
//         setLoader(true);
//       const response = await axios.post("https://airquality-production.up.railway.app/predict", { city: cityName });
//       setForecast(response.data.predictions);
//       localStorage.setItem("data", JSON.stringify(response.data.predictions));
//       toast.success(`Weather & Air Quality of ${cityName}`);
//       setLoader(false)
//       navigate("/searchresults");

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setForecast(null); // Error case mein bhi forecast null rakho
//       setLoader(false);
//     }
//   };

//   return (
//     <>
//      <div className="container mx-auto p-6 flex flex-col items-center min-h-screen">
//     {/* Heading */}
//     <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">
//       Air Quality Early Warning System
//     </h1>

//     <SearchBar onSearch={handleSearch} />

//     {/* Loader ya Home Card */}
//     {loader ? (
//       <div className="mt-6 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>

//       </div>
//     ) : (
//       <div className="mt-6 bg2 text-white p-6 rounded-lg h-60 shadow-lg flex flex-col items-center w-full max-w-md">
//         <h2 className="text-2xl font-bold flex items-center">
//           <WiDaySunny className="text-yellow-300 mr-2" size={92} /> {city? city : "Indore"}
//         </h2>
//         <div className="flex justify-between w-full mt-4">
//           <div className="flex items-center">
//             <WiThermometer className="text-red-400 mr-2" size={28} />
//             {forecast?<p className="text-lg"> {(((oneCityData?.currentConditions?.temp - 32) * 5) / 9).toFixed(2)} °C</p>:
//             <p className="text-lg">10 deg</p>}
//           </div>
//           <div className="flex items-center">
//             <WiCloud className="text-gray-200 mr-2" size={28} />
//            { forecast?<p className="text-lg">{oneCityData?.currentConditions?.conditions }</p>:
//             <p className="text-lg">Clear</p>}
//           </div>
//           <div className="flex items-center">
//             <WiStrongWind className="text-blue-300 mr-2" size={28} />
//             { forecast?<p className="text-lg">{oneCityData?.currentConditions?.windspeed } km/h</p>:
//             <p className="text-lg">Clear</p>}
//           </div>
//         </div>
//         <div className="flex gap-10 mt-5">
//             <p className="text-center font-bold ">AQI : {forecast?forecast[0].aqi:'45'}</p>
//             <p className="text-center font-bold ">PM<small>2.5</small> : {forecast ? parseFloat(forecast[0].pm25).toFixed(2) : '22.22'} µg/m³</p>

//         </div>
//       </div>
//     )}
//   </div>
//     <Footer />
//     </>
   

//   );
// };

// export default Home;

import { useContext, useEffect } from "react";
import React from "react";
import axios from "axios";
import SearchBar from "../Components/Searchbar";
import { ForecastContext } from "../context/ForecastContext";
import { 
  WiThermometer, WiCloud, WiStrongWind, WiDaySunny, 
  WiHumidity, WiBarometer, WiSunrise, WiSunset, WiRaindrop, 
  WiSmoke 
} from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

const Home = () => {
  const { forecast, setForecast, city, setCity, loader, setLoader, oneCityData } = useContext(ForecastContext);
  const navigate = useNavigate();

  useEffect(() => {
    ["city", "local", "data"].forEach(item => localStorage.removeItem(item));
  }, []);

  const handleSearch = async (cityName) => {
    if (!cityName) return;
    try {
      setCity(cityName);
      setLoader(true);
      const response = await axios.post("http://localhost:5000/predict", { city: cityName });
      setForecast(response.data.predictions);
      localStorage.setItem("data", JSON.stringify(response.data.predictions));
      toast.success(`Weather & Air Quality of ${cityName}`);
      setLoader(false);
      navigate("/searchresults");
    } catch (error) {
      console.error("Error fetching data:", error);
      setForecast(null);
      setLoader(false);
    }
  };

  const temperature = forecast ? (((oneCityData?.currentConditions?.temp - 32) * 5) / 9).toFixed(2) : "10";
  const conditions = forecast ? oneCityData?.currentConditions?.conditions : "Clear";
  const windSpeed = forecast ? oneCityData?.currentConditions?.windspeed : "5";
  const humidity = forecast ? oneCityData?.currentConditions?.humidity : "60";
  const pressure = forecast ? oneCityData?.currentConditions?.pressure : "1015";
  const uvIndex = forecast ? oneCityData?.currentConditions?.uvindex : "5";
  const sunrise = forecast ? oneCityData?.currentConditions?.sunrise : "06:15 AM";
  const sunset = forecast ? oneCityData?.currentConditions?.sunset : "06:45 PM";
  const aqi = forecast ? forecast[0].aqi : "45";
  const pm25 = forecast ? parseFloat(forecast[0].pm25).toFixed(2) : "22.22";

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Air Quality Early Warning System
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loader ? (
          <div className="mt-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
            
            {/* Weather Card */}
            <div className="p-8 rounded-lg shadow-md flex flex-col items-center border border-gray-300 bg-blue-600 text-white">
              <WiDaySunny size={60} className="text-yellow-300 mb-2" />
              <h2 className="text-3xl font-bold">{city || "Indore"}</h2>
              <p className="text-xl font-semibold mt-2">{conditions}</p>
              <div className="flex gap-6 mt-4 text-lg">
                <p className="flex items-center"><WiThermometer className="mr-2 text-red-300" size={40} /> {temperature} °C</p>
                <p className="flex items-center"><WiStrongWind className="mr-2 text-gray-200" size={40} /> {windSpeed} km/h</p>
              </div>
            </div>

            {/* Air Quality Card */}
            <div className="p-8 rounded-lg shadow-md flex flex-col items-center border border-gray-300 bg-green-600 text-white">
              <WiSmoke size={60} className="text-gray-300 mb-2" />
              <h2 className="text-3xl font-bold">Air Quality</h2>
              <p className="text-xl font-semibold mt-2">AQI: {aqi}</p>
              <p className="text-lg">PM<small>2.5</small>: {pm25} µg/m³</p>
              <p className={`mt-2 text-xl font-bold ${aqi <= 50 ? "text-green-100" : aqi <= 100 ? "text-yellow-100" : aqi <= 200 ? "text-orange-100" : "text-red-100"}`}>
                {aqi <= 50 ? "Good 😊" : aqi <= 100 ? "Moderate 😐" : aqi <= 200 ? "Unhealthy 😷" : "Hazardous 🚨"}
              </p>
            </div>

            {/* Additional Info Card */}
            <div className="p-8 rounded-lg shadow-md flex flex-col w-96 items-center border border-gray-300 bg-purple-600 text-white">
              <h2 className="text-3xl font-bold">Additional Info</h2>
              <div className="grid grid-cols-2 gap-6 mt-4 text-lg">
                <p className="flex items-center"><WiHumidity className="mr-2 text-blue-300" size={40} /> {humidity}%</p>
                <p className="flex items-center"><WiBarometer className="mr-2 text-red-300" size={40} /> {pressure} hPa</p>
                <p className="flex items-center"><WiRaindrop className="mr-2 text-cyan-300" size={40} /> UV Index: {uvIndex}</p>
                <p className="flex items-center"><WiSunrise className="mr-2 text-orange-300" size={40} /> {sunrise}</p>
                <p className="flex items-center"><WiSunset className="mr-2 text-pink-300" size={40} /> {sunset}</p>
              </div>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;




