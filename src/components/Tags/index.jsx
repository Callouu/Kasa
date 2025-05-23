import React from "react";

function Tags({ tag }) {
  return (
    <div>
      <ul className="tags">
        {tag.map((tag, index) => (
          <li className="tags__text" key={index}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
