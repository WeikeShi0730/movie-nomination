import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, onChange, disable, ...props }) => {
  return (
    <button
      className="button"
      type="button"
      disabled={disable}
      onClick={onChange}
      {...props}
    >
    {/*
      redner disabled button on condition
    */}
      <div className={`${disable ? "disable" : ""}`}>{children}</div>
    </button>
  );
};

export default CustomButton;
