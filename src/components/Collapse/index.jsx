import React, { useState } from "react";
import expandArrow from "../../assets/expand_arrow.svg";

function Collapse({ title, text, className }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className={className}>
      <button className="collapse__title-container" onClick={toggle}>
        <h2 className="collapse__title-container__title">{title}</h2>
        <img
          className={!open ? "expand_icon" : "expand_icon expand_icon--open"}
          src={expandArrow}
          alt="Cliquez-ici pour dérouler le texte"
        />
      </button>
      {open && <div className={`collapse__text${open ? " open" : ""}`}>{text}</div>}
    </div>
  );
}

export default Collapse;
