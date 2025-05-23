import React from "react";
import greyStar from "../../assets/star-inactive.svg";
import orangeStar from "../../assets/star-active.svg";

function Rating({ rating }) {
  const range = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {range.map((rangeElem) =>
        rating >= rangeElem ? (
          <img
            className="rating__stars"
            src={orangeStar}
            alt=""
            key={rangeElem.toString()}
          />
        ) : (
          <img
            className="rating__stars"
            src={greyStar}
            alt=""
            key={rangeElem.toString()}
          />
        )
      )}
    </div>
  );
}

export default Rating;
