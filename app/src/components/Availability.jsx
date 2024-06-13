import React, {useState, useEffect} from "react";
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

/**
 * Component to manage volunteer availability
 * 
 * @author James Sowerby w21023500
 */
function Availability(props){
    const [availabilityDates, setAvailabilityDates] = useState([]);

    useEffect(() => {
        // Check if props.id is truthy before making the fetch call
        if (props.id) {
            fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=${props.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const formattedDates = data.map(item => item.date);
                    setAvailabilityDates(formattedDates); // Update the state, not props
                })
                .catch(error => console.error('Error fetching availability data:', error));
        }
    }, [props.id]);

    const saveAvailability = () => {
        let formData = new FormData();
        formData.append('volunteerid', props.id);
        formData.append('date', availabilityDates);

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=' + props.id + '&date=' + availabilityDates, 
        {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.status === 401){
                localStorage.removeItem("token")
                props.setSignedIn(false)
                return []
            }
            if (response.status === 200 || response.status === 204){
                console.log('date saved')
                window.alert('Date updated!')
            }
        })
        .catch(error => console.error('Error updating: ', error))
    }

    const getAvailability = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=' + props.id)
        .then(response => {
            if (response.status === 401){
                localStorage.removeItem("token")
                props.setSignedIn(false)
                return []
            }
            if (response.status === 200 || response.status === 204){
                return response.json()
            }
        })
        .then(data => {
            props.selectedDates(data)
        })
        .catch(error => console.error('Error fetching availability: ', error))
    }

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            if (availabilityDates.includes(dateString)) {
                return 'availableDate'; // Make sure this CSS class is defined to style the date
            }
        }
    };

    return(
        <>
            <div className='flex flex-col items-center p-5'>
                <p className='text-2xl text-center'>Availability</p>
                <p className="text-center p-2">Input dates that you are available to volunteer and you will recieve a notification if there are any events made for those dates.</p>
                <ReactCalendar
                    onChange={value => {
                        const formattedDates = Array.isArray(value) ? value.map(date => date.toISOString().split('T')[0]) : [value.toISOString().split('T')[0]];
                        setAvailabilityDates(formattedDates);
                    }}
                    value={availabilityDates.map(dateString => {
                        const parsedDate = new Date(dateString);
                        return isNaN(parsedDate) ? undefined : parsedDate; // Only return valid dates
                    }).filter(date => !!date)} // Filter out undefined values
                    selectRange={false}
                    tileClassName={tileClassName}
                />
                <button onClick={saveAvailability} className="bg-gray-800 text-white px-4 py-2 rounded-b-md hover:bg-green-500">Save Availability</button>
            </div>
        </>
    )
}

export default Availability;