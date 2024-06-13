import React from "react";

import "./LearningOptions.css";


const LearningOptions = (props) => {
  const handleEvidenceTypesClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleEvidenceTypes();
  };

  const handleDonationsClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleDonations();
  };

  const handleVolunteeringClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleVolunteering();
  };

  const handleDetailsClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleDetails();
  };

  const handleAboutUsClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleAboutUs();
  };

  const options = [
    {
      text: "Account Issues",
      handler: props.actionProvider.handleJavascriptList,
      id: 1,
    },
    { text: "Donations", handler: handleDonationsClick, id: 6 },
    { text: "Contact Info", handler: handleDetailsClick, id: 6 },
    { text: "Volunteering", handler: handleVolunteeringClick, id: 3 },
    { text: "Evidence Types", handler: handleEvidenceTypesClick, id: 7 },
    { text: "About Us", handler: handleAboutUsClick, id: 7 },

  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;