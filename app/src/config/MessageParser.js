class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("allowed evidence types")) {
      this.actionProvider.handleEvidenceTypes();
    }

    // Check for specific queries related to contact details
    const contactInfoQueries = [
      "contact info",
      "contact details",
      "how to contact",
      "get in touch",
      "phone number",
      "call us",
      "telephone number",
      "reach us",
      "contact us",
      "customer support",
      "help desk",
      "support team",
      "contact",
      "phone",
      "email",
    ];

    for (const query of contactInfoQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleDetails();
        break;
      }
    }

    // Check for specific queries related to greetings
    const greetingsQueries = [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "greetings",
      "how are you",
      "what's up",
      "how's it going",
      "howdy",
      "yo",
      "hi there",
      "hello there",
      "hey there",
      "hi!",
      "hello!",
      "hey!",
    ];

    for (const query of greetingsQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleGreeting();
        break;
      }
    }

    // Check for specific queries related to greetings
    const aboutUsQueries = [
      "rose",
      "what is rose",
      "rose charity",
      "who is rose",
      "about rose",
      "rose charity",
      "learn about rose",
      "about the charity",
      "rose organization",
      "rose foundation",
      "what does rose do",
      "rose mission",
      "rose purpose",
      "what charity",
      "what charity is it",
      "rose objectives",
      "rose goals",
      "rose services",
    ];

    for (const query of aboutUsQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleAboutUs();
        break;
      }
    }


    // Check for specific queries related to evidence types
    const evidenceQueries = [
      "allowed evidence types",
      "evidence types",
      "what evidence",
      "allowed evidence",
      "submit evidence",
      "which evidence",
      "income proof",
      "income",
      "income upload",
      "evidence options",
      "income proofs",
      "income types",
      "proof of income",
      "document submission",
      "verification documents",
      "required documents",
      "upload proof",
      "evidence submission",
      "evidence requirements",
    ];

    for (const query of evidenceQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleEvidenceTypes();
        break;
      }
    }

    // Check for specific queries related to donations
    const donationQueries = [
      "how to donate",
      "donations",
      "send money",
      "donate",
      "donate to rose",
      "donate charity",
      "support charity",
      "how can I donate",
      "donation options",
      "make a donation",
      "give money",
      "charitable donation",
      "support rose",
      "donate now",
      "contribute",
      "charity support",
      "charity donation",
    ];

    for (const query of donationQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleDonations();
        break;
      }
    }

    // Check for specific queries related to volunteering
    const volunteeringQueries = [
      "volunteering opportunities",
      "volunteering",
      "how to volunteer",
      "become a volunteer",
      "volunteer",
      "volunteer work",
      "get involved",
      "give back",
      "help others",
      "community service",
      "charity work",
      "serve others",
      "volunteer programs",
      "join volunteers",
      "helping hands",
      "make a difference",
      "volunteering roles",
    ];

    for (const query of volunteeringQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleVolunteering();
        break;
      }
    }

    // Check for specific queries related to log in issues
    const accountLogInQueries = [
      "login problems",
      "can't log in",
      "trouble logging in",
      "login error",
      "forgot password",
      "reset password",
      "login help",
      "unable to sign in",
      "login assistance",
      "login issues",
      "sign-in problems",
      "log in issues",
      "log in troubles",
      "authentication problems",
      "login troubleshooting",
      "login not working",
      "login failed",
      "account access",
      "can't access account",
    ];

    for (const query of accountLogInQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleLoggingIn();
        break;
      }
    }

    // Check for specific queries related to registration issues
    const registrationIssuesQueries = [
      "registration problems",
      "can't register",
      "trouble registering",
      "registration error",
      "signup problems",
      "signup error",
      "registration help",
      "unable to sign up",
      "registration assistance",
      "registration issues",
      "sign-up problems",
      "create account problems",
      "registration troubleshooting",
      "registration not working",
      "registration failed",
      "account creation problems",
      "sign-up errors",
    ];

    for (const query of registrationIssuesQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleRegistering();
        break;
      }
    }
  }
}

export default MessageParser;

