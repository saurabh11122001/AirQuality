import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen  text-gray-800">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8">
        About This Web App 🌍
      </h1>

      {/* Introduction */}
      <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
        This AI-powered Air Quality Prediction Web App helps users track real-time air quality levels and provides 5-day forecasts for any city in India.  
        Our advanced Machine Learning models analyze environmental data to predict pollution trends and keep you informed.
      </p>

      {/* Features Section */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">🌟 Key Features</h2>
        <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-3 text-lg">
          <li>📍 Live AQI Data: Check the current Air Quality Index (AQI) of any Indian city.</li>
          <li>📊 5-Day Forecast: AI-based future air pollution predictions for better planning.</li>
          <li>🌡️ Weather Integration: Real-time temperature, humidity, wind speed, and more.</li>
          <li>⚠️ Health Alerts: Warnings & tips for high pollution days to protect your health.</li>
          <li>🚀 Tech-Driven: Built using React, Node.js, Machine Learning, and Open APIs.</li>
        </ul>
      </div>

      {/* Why Monitor Air Quality? */}
      <div className="mt-10 bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">📌 Why Monitor Air Quality?</h2>
        <p className="text-gray-700 mt-3 text-lg">
          Air pollution is a serious health hazard, affecting lungs, heart, and overall well-being.  
          With rising pollution levels, staying informed can help in preventive measures and better lifestyle choices.
        </p>
      </div>

      {/* Developer Information */}
      <div className="mt-12 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center">👨‍💻 About the Developer</h2>
        
        <div className="mt-4 text-center">
          <p className="text-xl text-gray-700 font-semibold">Developed by <span className="text-blue-700">Kuldeep Singh Rautela</span></p>
          <p className="text-gray-600">📍 Indore, India | PhD (pursuing) in Civil Engineering (with specialization in Water and Air)</p>
        </div>

        {/* Specialization */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">🔬 Specialization & Research:</h3>
          <p className="text-gray-700 mt-2">
          Civil Engineer with expertise in Hydrological and Hydrodynamic Modelling. 
          Strong background in Earth and Atmospheric Sciences research. Skilled in analysing water-related processes, 
          flood forecasting, and river dynamics. Proficient in advanced modelling techniques and experience in
          infrastructure design and construction. Dedicated to addressing water resources management challenges 
          and climate change impacts. Excellent analytical and problem-solving skills with strong communication
          and collaboration abilities.
          </p>
        </div>

        {/* Technologies Used */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">📌 Technologies Used:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>⚡Frontend: React.js, Tailwind CSS</li>
            <li>⚡Backend: Node.js, Express</li>
            <li>⚡Machine Learning: Python (Scikit-Learn, TensorFlow)</li>
            <li>⚡Data Sources:** Government AQI APIs, Custom Data Models</li>
          </ul>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500">
        <p>🌱 Stay Safe, Breathe Fresh, and Stay Informed! 🌍</p>
      </div>
    </div>
  );
};

export default About;
