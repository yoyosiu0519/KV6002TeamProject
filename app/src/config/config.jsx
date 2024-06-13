import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import LinkList from "../LinkList/LinkList";
import LearningOptions from "../components/LearningOptions";

const config = {
  botName: "ROSEbot",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What can I do for you today?", {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#334155",
    },
    chatButton: {
      backgroundColor: "#3b82f6",
    },
    floatingButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: '9999',
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "floatingIcon",
      widgetFunc: (props) => (
        <div style={config.customStyles.floatingButton} onClick={props.onClick}>
          <span>Chat</span>
        </div>
      ),
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => (
        <LinkList
          options={[
            {
              text: "Logging in",
              handler: () => props.actionProvider.handleLoggingIn(), // Handler for Logging in option
              id: 1,
            },
            {
              text: "Registering",
              handler: () => props.actionProvider.handleRegistering(), // Handler for Registering option
              id: 2,
            },
            {
              text: "Uploading the evidence",
              handler: () => props.actionProvider.handleUploadingEvidence(), // Handler for Uploading the evidence option
              id: 3,
            },
          ]}
          handleOptionClick={(option) => option.handler()} // Pass the handler function from each option
        />
      ),
    },    
  ],
};

export default config;
