/**
 * BecomeParticipant Component
 *
 * This component represents the welcome message before sign up form .
 * 
 * @author Maja Bosy
 * Student ID: W20037161
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Bs1Square } from "react-icons/bs";
import { Bs2Square } from "react-icons/bs";
import { Bs3Square } from "react-icons/bs";
import { Bs4Square } from "react-icons/bs";

function BecomeParticipant() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8 mb-8">
                <h1 className="text-3xl font-bold mb-4">Welcome to ROSE</h1>
                <p className="text-lg mb-4">Thank you for your interest in becoming a participant in our charity events!</p>
                <p className="text-lg mb-4">To register as a participant and take part in our cancer screenings, please follow these steps:</p>
                <ol className="pl-6 mb-4">
                    <li className="mb-2"><Bs1Square className="inline-block mr-2" />Click on the <strong className="text-blue-500">"Sign Up"</strong> button below to access the registration form.</li>
                    <li className="mb-2"><Bs2Square className="inline-block mr-2" />Fill out the required information, including your full name, email, phone number, date of birth, and password.</li>
                    <li className="mb-2"><Bs3Square className="inline-block mr-2" />Submit the registration form.</li>
                    <li className="mb-2"><Bs4Square className="inline-block mr-2" />Upload evidence of your income on your profile. This evidence is necessary to verify your eligibility for participation.</li>
                </ol>
                <p className="text-lg mb-4">Upon successful registration and verification of the income evidence, you will be notified via email and provided with further instructions on how to participate in our charity events.</p>
                <p className="text-lg mb-4">If you have any questions or need assistance, please feel free to contact us.</p>
                <div className="text-center">
                    <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold inline-block">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default BecomeParticipant