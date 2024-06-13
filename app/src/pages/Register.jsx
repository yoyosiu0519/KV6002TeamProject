/**
 * RegistrationForm Component
 *
 * This component represents the registration form for users to sign up.
 * 
 * @author Maja Bosy
 * Student ID: W20037161
 */

import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { LuUserPlus } from "react-icons/lu";
import { useEffect } from 'react';

function RegistrationForm({ onRegistration }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ticket, setTicket] = useState('3') // Ticket set to always 3
    const [confirmPassword, setConfirmPassword] = useState('')
    const salt = bcrypt.genSaltSync(10) // Generate salt for password hashing
    const [passwordStrength, setPasswordStrength] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    // Check password strength
    const checkPasswordStrength = (password) => {
        // Calculate password strength
        let strength = 0
        if (password.length >= 8) strength += 1
        if (password.length >= 12) strength += 1
        if (/\d/.test(password)) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1

        // Return password strength based on the calculated score
        switch (strength) {
            case 0:
            case 1:
            case 2:
                return 'Weak'
            case 3:
            case 4:
                return 'Moderate'
            case 5:
            case 6:
                return 'Strong'
            default:
                return '' // No color applied for empty or unknown strength
        }
    }

    // Pasword strength colours
    const getPasswordStrengthTextClass = () => {
        switch (passwordStrength) {
            case 'Weak':
                return 'text-green-500'
            case 'Moderate':
                return 'text-orange-500'
            case 'Strong':
                return 'text-red-500'
            default:
                return '' // No color applied for empty or unknown strength
        }
    }

    useEffect(() => {
        // Calculate password strength when component mounts
        if (password) {
            setPasswordStrength(checkPasswordStrength(password));
        }
    }, [password]);


    // Handle password input changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        setPasswordStrength(checkPasswordStrength(newPassword))
    }

    // Handle confirm password input changes
    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value
        setConfirmPassword(newPassword)
    }

    // Handle registration form submission
    const handleRegistration = () => {
        const currentDate = new Date()
        const selectedDate = new Date(dob)
        const nameRegex = /^[a-zA-Z\s]*$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Calculate age based on date of birth
        const ageDifferenceMs = currentDate - selectedDate;
        const ageDate = new Date(ageDifferenceMs);
        const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (selectedDate > currentDate) {
            setErrorMessage('Please enter a valid date of birth.');
            return
        }

        // Name validation
        if (!name.match(nameRegex)) {
            setErrorMessage('Please enter a valid name with no special characters or numbers.');
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return
        }

        // Phone number validation regex for numeric format only
        const phoneRegex = /^[0-9]+$/;

        // Phone number validation
        if (!phone.match(phoneRegex)) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        // Email validation
        if (!email.match(emailRegex)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Age validation, at least 18
        if (selectedDate >= currentDate || userAge < 18) {
            setErrorMessage('You must be at least 18 years old to register.');
            return;
        }

        if (name.trim() !== '' && dob.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && password.trim() !== '' && ticket.trim() !== '') {
            const hashedPassword = bcrypt.hashSync(password, salt) // Hash the password

            let formData = new FormData()
            formData.append('name', name)
            formData.append('dob', dob)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('password', hashedPassword)

            // Append ticket amount
            formData.append('ticket', ticket)

            // Send a POST request to register the user
            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/register', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    // Check if registration was successful
                    if (response.status === 200 || response.status === 204) {
                        window.alert('You have successfully created an account.');
                        // Redirect to homepage
                        window.location.href = '/assessment/app/'
                    } else if (response.status === 450) { // Check if email already exists
                        response.json().then(data => {
                            // Show an alert to the user
                            setErrorMessage(data.error || 'Email already exists.');
                        });
                    } else {
                        // Registration failed, handle other errors
                        response.json().then(data => {
                            setErrorMessage(data.error || 'Registration failed. Please try again later.');
                        });
                    }
                })
                .catch(error => {
                    console.error('Error registering:', error);
                    setErrorMessage('Registration failed. Please try again later.');
                });
        } else {
            setErrorMessage('Please fill in all fields.');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white rounded-lg shadow p-8 max-w-lg w-full">
                <div className="flex justify-center mb-4">
                    <LuUserPlus className="text-5xl text-gray-600" />
                </div>
                <h2 className="text-center text-2xl font-semibold mb-4">Participant Sign Up</h2>
                {errorMessage && (
                    <div className="bg-red-500 text-white p-2 mb-4 text-center">{errorMessage}</div>
                )}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold text-gray-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Please enter your full name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold text-gray-700">E-mail</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Please enter your e-mail..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-semibold text-gray-700">Phone number</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Please enter your phone number..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block font-semibold text-gray-700">Date of birth</label>
                        <input
                            id="dob"
                            type="date"
                            placeholder="Date of birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block font-semibold text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    Password strength: <span className={getPasswordStrengthTextClass()}>{passwordStrength}</span>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleRegistration}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-1 rounded-md mt-2 mb-1">
                    <p className="text-sm">
                        <span className="font-bold">Note:</span> Participation in our charity events requires the submission of proof of income via your profile upon logging in. This crucial step ensures that our events reach those most in need. After submission, our dedicated staff will review your eligibility to ensure fairness and transparency in our selection process.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RegistrationForm

