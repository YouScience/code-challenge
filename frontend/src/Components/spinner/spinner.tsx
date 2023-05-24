import React from "react";
import spinner from "../../assets/image/spinner1.gif";

import "./spinner.css";

const Spinner = () => {
  return (
    <div id="spinnerContainer">
      <img src={spinner} alt="spinner" id="spinnerImg" />
    </div>
  );
};

export default Spinner;
