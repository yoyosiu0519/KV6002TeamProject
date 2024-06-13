import { useState } from 'react'
import bcryt from 'bcryptjs'
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Registration page for volunteers.
 * 
 * @author James Sowerby w21023500
 */
function VolunteerSignUp() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const salt = bcryt.genSaltSync(10)

    const handleRegistration = () => {
        // name validation
        if (!/^[A-Za-z\s]+$/.test(name)) {
            setError('Name must contain only letters and spaces.');
            return
        }

        // validate age is 18+
        const birthDate = new Date(dob);
        const today = new Date();
        const m = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        if (age < 18) {
            setError('You must be at least 18 years old to sign up.');
            return
        }

        // validate email format
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('Email is not in valid format.');
            return;
        }

        // validate phone number (only numbers and up to 11 digits)
        if (!/^\d{1,11}$/.test(phone)) {
            setError('Phone number must contain only numbers and be no longer than 11 digits.');
            return;
        }

        if (password !== confirmPassword){
            setError('Passwords do not match')
            return
        }

        if (name.trim() && email.trim() && dob.trim() && password.trim() && confirmPassword.trim() && phone.trim()){
            const hashedPassword = bcryt.hashSync(password, salt)

            let formData = new FormData()
            formData.append('name', name)
            formData.append('dob', dob)
            formData.append('email', email)
            formData.append('password', hashedPassword)
            formData.append('phone', phone)

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteer', 
            {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.status === 200 || response.status === 204){
                    console.log('Volunteer added')
                    window.alert('Registration successful! You can now sign in.')
                    navigate('/')
                } else {
                    console.error('Error registering: ', response)
                    setError('An error during registration occurred')
                }
            })
            .catch(error => {
                console.error('Error registering: ', error)
                setError('An error during registration occurred')
            })
        } else {
            setError('Please fill in all fields')
        }
    }

    return (
        <>
        <div className="bg-gray-100 p-2 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8 mb-2">
                <h1 className="text-3xl font-bold mb-4 text-center">Want to help?</h1>
                <p className="text-lg mb-4">Rose is always looking for volunteers to help out at our events.</p>
                <p className="text-lg mb-4">To register as a volunteer, please fill out the form below.</p>
                <p className="text-lg mb-4">Upon successful registration, you can visit your profile, where you can choose which events to help out at.</p>
                <p className="text-lg mb-4">If you have any questions or need assistance, please feel free to contact us.</p>
            </div>
        </div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 pt-2'>
        <div className='bg-white rounded-lg shadow-md p-8 max-w-lg w-full'>
            <h2 className='text-center text-2xl font-semibold mb-4'>Volunteer Sign Up</h2>
            {error && (
                <div className='bg-red-500 text-white p-2 mb-4 text-center'>{error}</div>
            )}
            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label htmlFor='name' className='block font-semibold text-gray-700'>Name</label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Please enter your name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='dob' className='block font-semibold text-gray-700'>Date of Birth</label>
                    <input 
                        id='dob'
                        type='date'
                        placeholder='Date of Birth'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='email' className='block font-semibold text-gray-700'>Email</label>
                    <input 
                        id='email'
                        type='email'
                        placeholder='Please enter your email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block font-semibold text-gray-700'>Password</label>
                    <input 
                        id='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block font-semibold text-gray-700'>Confirm Password</label>
                    <input 
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='phone' className='block font-semibold text-gray-700'>Phone</label>
                    <input 
                        id='phone'
                        type='tel'
                        placeholder='Please enter your phone number...'
                        maxLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
            </div>
            <div className='mt-4'>
                <button
                    onClick={handleRegistration}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                >
                    Sign Up
                </button>
            </div>
        </div>
    </div>
    </>
);
}

export default VolunteerSignUp