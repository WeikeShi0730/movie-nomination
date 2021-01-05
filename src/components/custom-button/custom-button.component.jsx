import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (props) => {
  const { nominated, onChange, disable } = props;

  return (
    <button
      className="custom-button"
      type="button"
      disabled={disable}
      onClick={onChange}
    >
      <div className={`${disable ? "disable" : ""}`}>
        {disable ? "nominate" : nominated ? "Un-nominate" : "Nominate"}
      </div>
    </button>
  );
};

export default CustomButton;
