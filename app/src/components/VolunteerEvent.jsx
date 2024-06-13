import React, { useState, useEffect } from 'react';

/**
 * The event component for volunteers.
 * 
 * @author James Sowerby
 */

function VolunteerEvent(props) {
    const [extendEvent, setExtendEvent] = useState(null);
    
    const toggleVisibility = () => {
        if (extendEvent === props.event.eventID) {
            setExtendEvent(null);
        } else {
            setExtendEvent(props.event.eventID);
        }
    };

    const expandedEventClass = "md:col-span-2";
    const isExpanded = props.event.eventID === extendEvent;

    return (
        <div className={`cursor-pointer ${isExpanded ? expandedEventClass : ""}`}>
            <h2
                className="text-xl font-semibold cursor-pointer"
                onClick={() => toggleVisibility(props.event.eventID)}
            >
                {props.event.event_name}
            </h2>

            {isExpanded && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p className="mb-2">{props.event.event_description}</p>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="mb-2">{props.event.event_location}</p>
                    <h4 className="text-lg font-semibold">Date</h4>
                    <p className="mb-2">{props.event.event_date}</p>
                    <h3 className="text-lg font-semibold">Time</h3>
                    <p className="mb-2">{props.event.event_time}</p>
                </div>
            )}
        </div>
    );
}

export default VolunteerEvent;
