import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const RecenterAndZoom = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 12); // Zoom level
  }, [position, map]);
  return null;
};

const CityMap = ({ city }) => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default India Coordinates

  useEffect(() => {
    if (!city) return;

    const fetchCoordinates = async () => {
      try {
        const response = await axios.post("https://airquality-3bg2.onrender.com/get-coordinates", { city });
        setPosition([parseFloat(response.data.lat), parseFloat(response.data.lon)]);
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [city]);

  return (
    <MapContainer center={position} zoom={5} style={{ height: "280px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RecenterAndZoom position={position} />
    </MapContainer>
  );
};

export default CityMap;
