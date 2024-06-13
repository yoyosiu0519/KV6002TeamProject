
import "./LinkList.css";
import React from "react";


const LinkList = ({ options, handleOptionClick }) => {
  const handleClick = (option) => {
    handleOptionClick(option); // Call the handleOptionClick function provided by the actionProvider
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.id} className="link-list-item-url" onClick={() => handleClick(option)}>
          {option.text}
        </div>
      ))}
    </div>
  );
};

export default LinkList;
