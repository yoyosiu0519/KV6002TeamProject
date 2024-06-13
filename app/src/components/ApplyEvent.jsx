/**
 * ApplyEvent Component
 *
 * This component allows the users to apply for events.
 * 
 * @author Maja Bosy
 */

import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


function ApplyEvent(props) {
    const [userID, setUserID] = useState('')
    const [apply, setApply] = useState('')
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
        }
    })



    const applyToEvent = () => {
        let formData = new FormData()
        formData.append('eventid', props.eventID)
        formData.append('participantid', userID)

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/attend', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                console.log(userID)
                console.log('Response:', response)
                console.log(props.eventID)
                if (response.status === 200 || response.status === 204) {
                    setApply(apply)
                    window.alert('You have booked the event successfully!')
                    window.location.reload()
                } else if (response.status === 467) {
                    window.alert('Sorry, this event has no spaces left.')
                    window.location.reload()
                } else if (response.status === 468) {
                    window.alert('Sorry, you are out of tickets. Please contact our customer service at support@rose.com for more details.')
                    window.location.reload()
                } else if (response.status === 469) {
                    window.alert('You have already booked this event.')
                    window.location.reload()
                } else if (response.status === 472) {
                    window.alert('You are not eligible.')
                    window.location.reload()
                }
                navigate("/")
                return response.json()

            })
            .catch(error => {
                console.error('Error applying to event:', error)
            })
    }

    const cancelEventAttendance = () => {
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/attend?participantid=${userID}&eventid=${props.eventID}`, {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
        })
            .then(response => {
                console.log(props.userID)
                console.log(response.status)
                if (response.status === 200 || response.status === 204) {
                    setApply(apply)
                    window.alert('You have successfully cancelled your attendance at the event.')
                } else if (response.status === 471) {
                    window.alert('To cancel you need to attend')
                    window.location.reload()
                } else {
                    window.alert('Cancellation successful')
                    window.location.reload()
                }
                navigate("/")
                window.location.reload()
            })
    }


    return (
        <div className="flex justify-center space-x-4 mb-4">
            <button
                name='apply'
                className='w-full my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
                type='submit'
                value='Apply'
                onClick={applyToEvent}
            >
                Book Event
            </button>
            <button
                name='cancel'
                className='w-full my-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
                type='submit'
                value='Cancel'
                onClick={cancelEventAttendance}
            >
                Cancel Attendance
            </button>
        </div>
    )
}
export default ApplyEvent


