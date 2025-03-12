import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const AQIMeter = ({ value }) => {
  return (
    <div className="w-60">
      <ReactSpeedometer
        value={value}
        minValue={0}
        maxValue={500}
        needleColor="black"
        startColor="green"
        segments={5}
        endColor="red"
        currentValueText={`AQI: ${value}`}
        textColor="black"
        height={200}
      />
    </div>
  );
};

export default AQIMeter;

