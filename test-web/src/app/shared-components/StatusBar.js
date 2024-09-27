import * as React from "react";

export const StatusBar = (props) => {
  const handleBlur = (e) => {
    if (e.target.value !== props.documentName) {
      props.onNameChange(e.target.value);
    }
  };

  return (
    <header className="status-bar">
      <input
        className="font"
        defaultValue={props.documentName}
        onBlur={handleBlur}
      />
      <span className="font">
        &nbsp;-&nbsp;{props.displayIsSaving ? "Saving" : "Saved"}
      </span>
    </header>
  );
};
