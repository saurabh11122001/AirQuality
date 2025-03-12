import { use, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import SearchBar from "../Components/Searchbar";
import { ForecastContext } from "../context/ForecastContext";
import { WiThermometer, WiCloud, WiStrongWind, WiDaySunny } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import './home.css';
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

const Home = () => {
  const { forecast, setForecast , city,setCity,loader,setLoader,oneCityData} = useContext(ForecastContext);
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem("city") || localStorage.getItem("local") || localStorage.getItem("data")){
        localStorage.removeItem("city");
        localStorage.removeItem("local");
        localStorage.removeItem("data");
      }
    },[])
  const handleSearch = async (cityName) => {
    if (!cityName) {
      return;
    }
    try {
        setCity(cityName);
        setLoader(true);
      const response = await axios.post("https://airquality-3bg2.onrender.com/predict", { city: cityName });
      setForecast(response.data.predictions);
      localStorage.setItem("data", JSON.stringify(response.data.predictions));
      toast.success(`Weather & Air Quality of ${cityName}`);
      setLoader(false)
      navigate("/searchresults");

    } catch (error) {
      console.error("Error fetching data:", error);
      setForecast(null); // Error case mein bhi forecast null rakho
      setLoader(false);
    }
  };

  return (
    <>
     <div className="container mx-auto p-6 flex flex-col items-center min-h-screen">
    {/* Heading */}
    <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">
      Air Quality Early Warning System
    </h1>

    <SearchBar onSearch={handleSearch} />

    {/* Loader ya Home Card */}
    {loader ? (
      <div className="mt-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>

      </div>
    ) : (
      <div className="mt-6 bg2 text-white p-6 rounded-lg h-60 shadow-lg flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold flex items-center">
          <WiDaySunny className="text-yellow-300 mr-2" size={92} /> {city? city : "Indore"}
        </h2>
        <div className="flex justify-between w-full mt-4">
          <div className="flex items-center">
            <WiThermometer className="text-red-400 mr-2" size={28} />
            {forecast?<p className="text-lg"> {(((oneCityData?.currentConditions?.temp - 32) * 5) / 9).toFixed(2)} °C</p>:
            <p className="text-lg">10 deg</p>}
          </div>
          <div className="flex items-center">
            <WiCloud className="text-gray-200 mr-2" size={28} />
           { forecast?<p className="text-lg">{oneCityData?.currentConditions?.conditions }</p>:
            <p className="text-lg">Clear</p>}
          </div>
          <div className="flex items-center">
            <WiStrongWind className="text-blue-300 mr-2" size={28} />
            { forecast?<p className="text-lg">{oneCityData?.currentConditions?.windspeed } km/h</p>:
            <p className="text-lg">Clear</p>}
          </div>
        </div>
        <div className="flex gap-10 mt-5">
            <p className="text-center font-bold ">AQI : {forecast?forecast[0].aqi:'45'}</p>
            <p className="text-center font-bold ">PM<small>2.5</small> : {forecast ? parseFloat(forecast[0].pm25).toFixed(2) : '22.22'} µg/m³</p>

        </div>
      </div>
    )}
  </div>
    <Footer />
    </>
   

  );
};

export default Home;





