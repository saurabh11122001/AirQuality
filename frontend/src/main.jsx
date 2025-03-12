import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ForecastProvider } from "./context/ForecastContext";
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ForecastProvider>
    <App />
    <ToastContainer />
  </ForecastProvider>
);
