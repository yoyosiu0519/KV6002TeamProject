/**
 * ParticipantPage Component
 *
 * This component represents the page for editing the participant profile.
 * 
 * @author Maja Bosy
 * Student ID: W20037161
 */
import React, { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';

function ParticipantPage(props) {
    const [name, setName] = useState(props.name || '');
    const [phone, setPhone] = useState(props.phone ? String(props.phone) : '');
    const [email, setEmail] = useState(props.email || '');
    const [evidence, setEvidence] = useState(props.evidence || '');
    const [errorMessage, setErrorMessage] = useState('');
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/participant', {
            method: 'GET',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data && data.length > 0) {
                    setName(data[0].name)
                    setPhone(data[0].phone)
                    setEmail(data[0].email)
                    setEvidence(data[0].evidence || '');
                }
            })
            .catch(error => {
                console.error('Error fetching participant:', error)
            })
    }, [])

    const updateParticipant = (event) => {
        event.preventDefault();

        // Name validation
        if (!name.match(nameRegex)) {
            setErrorMessage('Please enter a valid name with no special characters or numbers.');
            return;
        }

        // Email validation
        if (!email.match(emailRegex)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Phone number validation regex for numeric format only
        const phoneRegex = /^[0-9]+$/;

        // Phone number validation
        if (String(phone).trim() === '' || !String(phone).match(phoneRegex)) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        // If validation passes, proceed with update
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('evidence', evidence);

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/participant', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                if (response.status === 204) {
                    // If response status is 204, consider it successful
                    window.alert('You have updated your profile successfully!');
                    return;
                } else if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to update the data. Server returned status: ' + response.status);
                }
            })
            .then(data => {
                // Process data if it exists (for successful responses with content)
                if (data) {
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setEvidence(data.evidence || '');
                }
            })
            .catch(error => {
                window.alert(error.message);
            });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-3xl mx-auto py-6">
                <div className="bg-white shadow-md rounded px-8 py-8">
                    <div className="flex justify-center mb-4">
                        <FiUser className="text-5xl text-gray-600" />
                    </div>
                    <h2 className="text-center text-2xl font-semibold mb-4">My Profile</h2>
                    <p className="text-center">Welcome to your participant profile where you can conveniently edit your details and securely upload income evidence.</p>
                    {errorMessage && (
                        <div className="bg-red-500 text-white p-2 mb-4 text-center">{errorMessage}</div>
                    )}
                    <form onSubmit={updateParticipant}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="evidence" className="block text-gray-700 text-sm font-bold mb-2">Evidence</label>
                            <input
                                id="evidence"
                                type="file"
                                onChange={(e) => setEvidence(e.target.files[0])}
                                accept="image/png, image/jpeg, image/jpg, application/pdf,application/vnd.ms-excel"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-xs text-gray-600 mt-1"></p>
                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-1 rounded-md mt-2 mb-1">
                                <p className="text-sm">
                                    <span className="font-bold">Info:</span> Please attach a proof of your income which will be reviewed by the member of staff. This can be a pdf or png, jpg or jpeg file. For more information, please head to our ROSE chatbot.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ParticipantPage;
