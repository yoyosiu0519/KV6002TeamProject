import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

/**
 * New Event page
 * 
 * This page is in charge of adding new event to the home page.
 * Only the admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

function NewEvent() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [space, setSpace] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const postEvent = () => {
        if (name && description && date && time && location && space) {
            let formData = new FormData();
            formData.append('name', name)
            formData.append('description', description)
            formData.append('date', date)
            formData.append('time', time)
            formData.append('location', location)
            formData.append('space', space)

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/event',
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(handleResponse)
                .then(handleJSON)
                .catch(error => {
                    console.error('Error:', error);
                    });
        } else {
            toast.error('Unable to post event');
        }
    }

    const handleResponse = (response) => {
        if (response.status === 200 || response.status === 204) {
            toast.success('Event added successfully');
            setName('')
            setDescription('')
            setDate('')
            setTime('')
            setLocation('')
            setSpace('')
            return response.json()
        } else if (response.status === 409) {
            toast.error('Please check the event details and try again.');
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
                <h2 className="text-center text-2xl font-semibold mb-8">Post Event</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold text-gray-700">Event Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter event name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-semibold text-gray-700">Description:</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Enter event description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block font-semibold text-gray-700">Event Date:</label>
                        <input
                            id="date"
                            type="date"
                            placeholder="Enter event date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block font-semibold text-gray-700">Event Time:</label>
                        <input
                            id="time"
                            type="time"
                            placeholder="Enter event time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block font-semibold text-gray-700">Event Location:</label>
                        <input
                            id="location"
                            type="text"
                            placeholder="Enter event location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="space" className="block font-semibold text-gray-700">Available Slots:</label>
                        <input
                            id="space"
                            type="number"
                            placeholder="Enter available slots"
                            value={space}
                            onChange={(e) => setSpace(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                        onClick={postEvent}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
export default NewEvent