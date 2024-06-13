class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "I am really sorry you are experiencing technical difficulties.",
      {
        widget: "javascriptLinks",
      }
    );
    this.updateChatbotState(message);
  };

  handleDonations = () => {
    const donationMessage = "Thank you for your interest in donating! Your generosity can make a significant impact. To proceed with your donation, please visit our Sponsor page. Thank you again for your generosity and kindness. Together, we can make a difference!";

    // Create a chatbot message with the donation information
    const message = this.createChatBotMessage(donationMessage);

    // Update the chatbot state
    this.updateChatbotState(message);
  };

  handleDetails = () => {
    const detailsMessage = "For any inquiries or assistance, you can reach out to us via email at support@rose.com or by phone at +1-800-555-1234. Our dedicated support team is here to help you with any questions or concerns you may have.";
    const message = this.createChatBotMessage(detailsMessage);
    this.updateChatbotState(message);
  };

  handleGreeting = () => {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.updateChatbotState(message);
  };

  handleVolunteering = () => {
    const volunteeringMessage = "Thank you for your interest in volunteering! To join ROSE charity as a Volunteer, simply go to 'Become a Volunteer' menu section. This will take you to the registation form where you will be able to sign up. If you encounter any issues, please contact our support team at support@rose.com.";
    const message = this.createChatBotMessage(volunteeringMessage);
    this.updateChatbotState(message);
  };

  handleAboutUs = () => {
    const aboutUsMessage = "ROSE is a compassionate charity dedicated to providing vital cancer screenings and comprehensive support services to individuals facing financial constraints. Our mission is to ensure that everyone, regardless of their financial situation, has access to life-saving screenings and the care they need. Through our programs, we offer affordable or free screenings, educational resources, and emotional support to empower individuals in their fight against cancer. Join us in making a difference in the lives of those affected by cancer.";
    const message = this.createChatBotMessage(aboutUsMessage);
    this.updateChatbotState(message);
  };

  handleEvidenceTypes = () => {
    // Define the evidence types
    const evidenceTypes = [
      "Please see the allowed evidence types you can submit:",
      "Payslips",
      "Employment Verification Letter",
      "Bank Statements",
      "Tax Returns",
      "Pension Statements",
      "Alimony or Child Support Documentation"
    ];

    // Iterate over the evidence types to create and update chatbot state
    evidenceTypes.forEach(evidence => {
      const message = this.createChatBotMessage(evidence);
      this.updateChatbotState(message);
    });
  };

  handleEvidence = () => {
    const message = this.createChatBotMessage(
      "To participate in the charity events you will have to provide a proof of income. This evidence is necessary to verify your eligibility for participation.",
      {
        widget: "incomeEvidence",
      }
    );
    this.updateChatbotState(message);
  };

  handleLoggingIn = () => {
    const message = this.createChatBotMessage(
      "I apologize for the inconvenience. If you're experiencing issues logging in, please reach out to us via email at support@rose.com."
    );
    this.updateChatbotState(message);
  };

  handleRegistering = () => {
    const message = this.createChatBotMessage(
      "I apologize for the inconvenience. If you're experiencing issues registering, please try the following troubleshooting steps:\n\n1. Try registering using a different web browser.\n2. Clear your browser's cache and cookies, then try again.\n3. Make sure you have a stable internet connection.\n4. Restart your device and try registering again.\n\nIf the issue persists, please reach out to us via email at support@rose.com for further assistance."
    );
    this.updateChatbotState(message);
  };

  handleUploadingEvidence = () => {
    const message = this.createChatBotMessage(
      "I'm sorry to hear you're having trouble uploading the evidence. Here are a few things you can try:\n\n1. Ensure that the files you're trying to upload meet the required file format and size limits.\n2. Check your internet connection to ensure it's stable.\n3. Try refreshing the page and uploading the evidence again.\n4. If you're using a mobile device, consider switching to a computer to upload the evidence.\n\nIf the issue persists, please contact our support team at support@rose.com for further assistance."
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;