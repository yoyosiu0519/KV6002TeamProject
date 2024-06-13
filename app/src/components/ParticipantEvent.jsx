/**
 * ParticipantEvent Component
 *
 * This component shows how many users are in the list for the event.
 * 
 * @author Antonio Gorgan
 */

import React, { useEffect, useState } from 'react';

function ParticipantEvent({ selectedEventID }) {
    const [participantData, setParticipantData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const eventUrl = 'https://w20021570.nuwebspace.co.uk/assessment/api/eventList';
        fetch(eventUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch event - ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setParticipantData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setLoading(false);
            });
    }, []);

    // Filter participant data for the selected event
    const selectedEventData = participantData.find(event => event.eventID === selectedEventID);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : selectedEventData ? (
                <div>
                    <h2> {selectedEventData.numberOfPa} participants are signed up for the appointment!</h2>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default ParticipantEvent;
