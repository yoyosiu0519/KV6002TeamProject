import React from 'react'
import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import VolunteerPage from "./pages/VolunteerPage"
import NotFound from "./pages/NotFound"
import VolunteerSignUp from "./pages/VolunteerSignUp"
import AdminRegister from './pages/AdminRegister'
import NewEvent from './pages/NewEvent'
import CheckParticipant from './pages/CheckParticipant'
import EventParticipant from './pages/EventParticipant'
import DisplaySponsor from './pages/DisplaySponsor'
import EventVolunteer from './pages/EventVolunteer'

import Header from "./components/Header"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"
import ParticipantPage from "./pages/ParticipantPage"
import RegistrationForm from "./pages/Register"
import BecomeParticipant from './pages/BecomeParticipant'
import Event from './components/Event'
import ApplyEvent from './components/ApplyEvent'
import Chatbot from 'react-chatbot-kit'
import ActionProvider from "./config/ActionProvider"
import MessageParser from "./config/MessageParser"
import config from "./config/config"
import 'react-chatbot-kit/build/main.css'
import ApplyWaitingList from './components/ApplyWaitingList'
import AboutUs from './pages/AboutUs'

/**
 * App component
 *  
 * @author Team 
 */
function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [roleType, setRoleType] = useState('')
  const [position, setPosition] = useState('')
  const [userID, setUserID] = useState('')

  console.log("Final Role type:", roleType);
  <>
    <ApplyEvent signedIn={signedIn}
      setSignedIn={setSignedIn}
      roleType={roleType}
      setRoleType={setRoleType}
      userID={userID}
      setUserID={setUserID}>  </ApplyEvent>

    <ApplyWaitingList signedIn={signedIn}
      setSignedIn={setSignedIn}
      roleType={roleType}
      setRoleType={setRoleType}
      userID={userID}
      setUserID={setUserID}>  </ApplyWaitingList>
  </>

  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div>
      {/* Chatbot icon */}
      <div
        className={`fixed bottom-20 right-8 bg-blue-500 text-white rounded-full p-4 cursor-pointer hover:bg-blue-600 ${showChatbot ? 'hidden' : ''}`}
        onClick={() => setShowChatbot(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      </div>
      {/* Chatbot component */}
      {showChatbot && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9998' }}>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
          {/* Close button */}
          <div
            className="absolute top-0 right-0 m-2 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600"
            onClick={() => setShowChatbot(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      )}

      <div className="">
        <SignIn
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          roleType={roleType}
          setRoleType={setRoleType}
          userID={userID}
          setUserID={setUserID}
          position={position}
          setPosition={setPosition}
        />
      </div>
      <header>
        <Header />
      </header>
      <nav className="">
        <Menu roletype={roleType} 
        position={position}
        signedIn={signedIn} />
        
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerPage userID={userID}/>} />
          <Route path="/volunteer-sign-up" element={<VolunteerSignUp />} />
          <Route path="/participant" element={<ParticipantPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin-sign-up" element={<AdminRegister />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/check-participant" element={<CheckParticipant />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/becomeparticipant" element={<BecomeParticipant />} />
          <Route path="/eventparticipant" element={<EventParticipant />} />
          <Route path="/sponsor" element={<DisplaySponsor />} />
          <Route path="/eventvolunteer" element={<EventVolunteer />} />
      </Routes>

      <footer className="bg-slate-700 shadow-lg p-2 text-md text-right" >

        <Footer />
      </footer>

    </div>

    
  )
}

export default App