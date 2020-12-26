import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (props) => {
  const { nominated, onChange } = props;

  return (
    <button type="button" onClick={onChange}>
      {nominated ? "un-nominate" : "nominate"}
    </button>
  );
};

export default CustomButton;
