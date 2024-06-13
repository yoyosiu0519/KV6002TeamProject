import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
/**
 * Event Participant page
 * 
 * This page is in charge of displaying a list of events and 
 * the attending participants with their contact numbers.
 * It also allows admin to export the list to PDF format.
 * Only admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

function EventParticipant() {
    const [expandedEvents, setExpandedEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const pdfRef = React.createRef();

    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/eventlist')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
                // Initialize expandedEvents array with false values for each event
                setExpandedEvents(Array(data.length).fill(false));
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    }, []);

    const toggleExpand = (index) => {
        setExpandedEvents(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const renderParticipants = (participants) => {
        if (!participants || participants.length === 0) {
            return <p>No participants found.</p>;
        }

        return (
            <div className="grid grid-cols-1 gap-4">
                {participants.map((participant, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{participant.name}</h2>
                        <p>Contact Number: {participant.phone}</p>
                    </div>
                ))}
            </div>
        );
    };

    const downloadPDF = () => {
        html2canvas(pdfRef.current, { windowWidth: window.innerWidth, windowHeight: window.innerHeight }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("download.pdf");
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto" ref={pdfRef}>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Event Participant</h1>
                    {loading ? <p>Loading...</p> : (
                        events.map((event, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md cursor-pointer m-4, mb-3">
                                <h1 className="text-xl font-semibold cursor-pointer mb-4" onClick={() => toggleExpand(index)}>{event.event_name}</h1>
                                {expandedEvents[index] && renderParticipants(parseParticipants(event))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={downloadPDF}
            >
                Export to PDF
            </button>
        </div>
    );
}

// Function to parse participants data from the event object
const parseParticipants = (event) => {
    if (!event.participantsNames || !event.phone) {
        return [];
    }

    const names = event.participantsNames.split(',');
    const phones = event.phone.split(',');

    return names.map((name, index) => ({ name, phone: phones[index] }));
};

export default EventParticipant;
