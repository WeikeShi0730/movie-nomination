import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (props) => {
  const { nominated, onChange, disable } = props;

  return (
    <button type="button" disabled={disable} onClick={onChange}>
      {disable ? "nominate" : nominated ? "un-nominate" : "nominate"}
    </button>
  );
};

export default CustomButton;
