import bcrypt from 'bcryptjs'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

/**
 * Admin Register page
 * 
 * This page is in charge of registering a new admin.
 * Only the head of admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

function AdminRegister() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('');

    const saveAdmin = () => {
        if (name && email && password) {
            // Hash password using bcrypt
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            let formData = new FormData();
            formData.append('name', name);
            formData.append('dob', dob);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', hashPassword); // Send hashed password
            formData.append('position', position);

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/adminregister',
                {
                    method: 'POST',
                    body: formData
                })
                .then(handleResponse)
                .then(handleJSON)
                .catch(error => console.error('Error:', error));
        } else {
            toast.error('Invalid submission.');
        }
    }


    const handleResponse = (response) => {
        console.log('Response status:', response.status);
        if (response.status === 200 || response.status === 204) {
            toast.success('Admin added successfully');
            setName('');
            setDob('');
            setEmail('');
            setPhone('');
            setPassword('');
            setPosition('');
            return response.json()
        } else if (response.status === 409) {
            toast.error('User already exists');
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setIsLoading(false)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <Toaster />
            <div className="bg-white rounded-lg shadow p-8 max-w-lg w-full">
                <h2 className="text-center text-2xl font-semibold mb-8">Add New Admin</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold text-gray-700">New Admin Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block font-semibold text-gray-700">Date of Birth:</label>
                        <input
                            id="dob"
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold text-gray-700">Email Address:</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-semibold text-gray-700">Contact Number:</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="016-xxx xxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-semibold text-gray-700">New Admin Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="*******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="position" className="block font-semibold text-gray-700">New Admin Position:</label>
                        <select
                            id="position"
                            className="input-field"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option value="">Select Admin Position:</option>
                            <option value="head">Head of Admin</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        onClick={saveAdmin}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminRegister