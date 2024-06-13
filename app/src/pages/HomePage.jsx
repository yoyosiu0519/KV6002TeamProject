/**
 * Home Page
 * 
 * Home page for the application uses the Event component to fetch and display the events details.
 * 
 * @author Antonio Gorgan.
 */

import React, { useEffect, useState } from 'react'
import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor'
import Event from '../components/Event'

function HomePage(props) {
    const [event, setevent] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [extendEvent, setextendEvent] = useState(null)

    const itemsPerPage = 10
    const startOfPage = (page - 1) * itemsPerPage
    const endOfPage = startOfPage + itemsPerPage
    const firstPage = page <= 1

    const nextPage = () => {
        if (!lastPage) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    const previousPage = () => {
        if (!firstPage) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    useEffect(() => {
        setLoading(true)
        setPage(1)
        const eventUrl = 'https://w20021570.nuwebspace.co.uk/assessment/api/event'
        fetch(eventUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch event - ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setevent(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching event:', error)
            })
    }, [])

    const eventJSX = event
        .slice(startOfPage, endOfPage)
        .map((item) => (
            <div
                key={item.eventID}
                className={`p-4 m-2 rounded-lg border border-gray-300 ${extendEvent === item.eventID ? 'md:col-span-2' : 'col-span-1'
                    }`}>
                <Event
                    event={item}
                    signedIn={props.signedIn}
                    extendEvent={extendEvent}
                    setextendEvent={setextendEvent}
                />
            </div>
        ))

    const lastPage = eventJSX.length === 0
    const prevDisabled = firstPage ? 'disabled' : ''
    const nextDisabled = lastPage ? 'disabled' : ''


    return (
        <>
            <div className='grid grid-cols-1 px-10 '>
                <div className="col-span-1 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Welcome to ROSE</h2>
                    <h3 className="text-xl font-semibold text-gray-700 mb-8">Explore Upcoming Events</h3>
                </div>
                {loading ? (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='loader'></div> </div>

                ) : (
                    <>
                        {eventJSX.length > 0 ? eventJSX : ''}

                        {/* Page buttons */}
                        {eventJSX.length > 0 && (
                            <div className='flex justify-center mb-4 col-span-full'>
                                <button
                                    onClick={previousPage}
                                    disabled={page <= 1}
                                    className={`py-2 px-4 mr-2 ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' :
                                        'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
                                > Previous
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={event.length === 0}
                                    className={`py-2 px-4 ${event.length === 0 ? 'bg-gray-300 cursor-not-allowed' :
                                        'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
                                > Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div >
            <div className="flex justify-center gap-8 bg-gray-100">
            <div className="flex flex-col justify-center">
                    <Newsletter />
                </div>
                <div className="flex flex-col justify-center">
                    <Sponsor />
                </div>
            </div>
        </>
    )
}

export default HomePage