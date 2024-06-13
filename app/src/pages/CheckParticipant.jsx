import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'

/**
 * Check Participant page
 * 
 * This page is in charge of checking the participant's eligibility based 
 * on the evidence provided by the participant. 
 * Only admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */
function CheckParticipant() {
    const [participants, setParticipants] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedParticipant, setExpandedParticipant] = useState(null);
    const [eligible, setEligible] = useState('');
    const [participantsID, setParticipantsID] = useState('');
    const [imageError, setImageError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 204) {
            return {}; // Return empty object for 204 status code
        } else {
            throw new Error("Invalid response: " + response.status);
        }
    };
    

    const handleJSON = (json) => {
        if (Array.isArray(json)) {
            const updatedParticipants = json.map(p => ({
                ...p,
                evidence: p.evidence ? `data:image/png;base64,${p.evidence}` : null,
                eligible: p.eligible ? String(p.eligible) : p.eligible
            }));
            setParticipants(updatedParticipants.filter(participant => participant.eligible === null));
            setIsLoading(false);
        } else {
            throw new Error("Invalid JSON: " + json);
        }
    };

    const showDetails = (index) => {
        setExpandedParticipant(index === expandedParticipant ? null : index);
    };

    const saveEligible = () => {
        if (!eligible || !participantsID) {
            toast.error('Please select eligibility status before submit.');
            return;
        }
    
        let formData = new FormData();
        formData.append('participantid', participantsID);
        formData.append('eligible', eligible);
    
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/checkparticipant', {
            method: 'POST',
            body: formData
        })
        .then(handleResponse)
        .then(() => {
            // Filter out the submitted participant from the list
            setParticipants(prevParticipants => prevParticipants.filter(participant => participant.participantID !== participantsID));
            toast.success('Eligibility saved successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage('An error occurred while saving eligibility.');
        });
    };
    
    

    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/checkparticipant')
        .then(response => handleResponse(response))
        .then(json => handleJSON(json))
        .catch(err => {
            console.log(err.message);
            setIsLoading(false);
            setIsError(true);
        });
    }, []);

    const keyMapping = {
        participantID: 'Participant ID: ',
        name: 'Name: ',
        dob: 'Date of Birth: ',
        email: 'Email Address: ',
        phone: 'Contact Number: ',
        eligible: 'Eligibility: ',
        evidence: 'Evidence: '
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Something went wrong</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Check Participant</h1>
                {participants.length === 0 && <p>No content found</p>}
                <div className="grid grid-cols-1">
                    {participants.map((participant, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md cursor-pointer m-4">
                            <h2 className="text-xl font-semibold cursor-pointer" onClick={() => showDetails(index)}>
                                {participant.name}
                            </h2>
                            {expandedParticipant === index && (
                                <div>
                                    {Object.keys(participant).map((key) => {
                                        const displayName = keyMapping[key] || key;
                                        if (key === 'eligible') {
                                            return (
                                                <div key={key} className="flex flex-col mb-4">
                                                    <div className="text-xl font-semibold">{displayName}</div>
                                                    <div>
                                                        <select
                                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                            name="eligible"
                                                            value={eligible}
                                                            onChange={(e) => {
                                                                setEligible(e.target.value);
                                                                setParticipantsID(participant.participantID);
                                                            }}
                                                        >
                                                            <option value="NULL">Approve / Reject</option>
                                                            <option value="1">Approve</option>
                                                            <option value="0">Reject</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        if (key === 'evidence') {
                                            return (
                                                <div key={key} className="flex flex-col mb-4">
                                                    <div className="text-xl font-semibold">{displayName}</div>
                                                    <div>
                                                        {participant[key] ? (
                                                            <img
                                                                src={participant[key]}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "";
                                                                    e.target.alt = "File not supported";
                                                                }}
                                                                alt="Evidence"
                                                                className="w-full h-auto object-contain"
                                                            />
                                                        ) : (
                                                            <p className="text-red-500">No file is inserted</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={key} className="flex flex-col mb-4">
                                                    <div className="text-xl font-semibold">{displayName}</div>
                                                    <div>{participant[key]}</div>
                                                </div>
                                            );
                                        }
                                    })}
                                    <div className="flex justify-center">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={saveEligible}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default CheckParticipant;
