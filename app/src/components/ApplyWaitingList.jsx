/**
 * ApplyEvent Component
 *
 * This component allows the users to join the wiating list for the event.
 * 
 * @authors Maja Bosy & Antonio Gorgan
 */

import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ApplyWaitingList(props) {
    const [apply, setApply] = useState('')
    const [userID, setUserID] = useState ('')
    const navigate = useNavigate()

    const parseJwt = (token) => {
        const decode = JSON.parse(atob(token.split('.')[1]))
        return decode
    }

    useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
        const decodedToken = parseJwt(token)
        const id = decodedToken.id
        setUserID(id)
    }})

    const applyToWaiting = () => {
        let formData = new FormData()
        formData.append('eventid', props.eventID)
        formData.append('participantid', userID)

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/waiting', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                console.log('Response:', response)
                console.log(props.eventID)
                if (response.status === 200 || response.status === 204) {
                    setApply(apply)
                    window.alert('You placed yourself in the event waiting list successfully!')
                    window.location.reload()
                } else if (response.status === 467) {
                    window.alert('Sorry, this waiting list has no spaces left.')
                    window.location.reload()
                } else if (response.status === 468) {
                    window.alert('Sorry, you are out of tickets. Please contact our customer service at support@rose.com for more details.')
                    window.location.reload()
                } else if (response.status === 469) {
                    window.alert('You already are in the waiting list for this event.')
                    window.location.reload()
                } else if (response.status === 472) {
                    window.alert('You are not eligible.')
                    window.location.reload()
                }
                navigate("/")
                window.location.reload()
                return response.json()
            })
            .catch(error => {
                console.error('Error applying to event:', error)
            })
    }
    
    
    return (
        <div className="flex justify-center space-x-4 mb-4">
            <button
                name='apply'
                className='w-full my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
                type='submit'
                value='Apply'
                onClick={applyToWaiting}
            >
                Join The Waiting List
            </button>
        </div>
    )
}
export default ApplyWaitingList



