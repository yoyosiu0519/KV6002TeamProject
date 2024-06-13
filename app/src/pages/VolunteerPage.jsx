import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Event from '../components/Event'
import VolunteerEvent from '../components/VolunteerEvent';
import Availability from '../components/Availability';

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function VolunteerPage(props) {
    const [details, setDetails] = useState([])
    const [event, setEvent] = useState([])
    const [volunteeredEvent, setVolunteeredEvent] = useState([])
    const [page, setPage] = useState(1)
    const [extendEvent, setextendEvent] = useState(null)
    const [id, setID] = useState('')
    const [selectedDates, setSelectedDates] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const navigate = useNavigate()

    // For updating profile details
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const itemsPerPage = 10
    const startOfPage = (page - 1) * itemsPerPage
    const endOfPage = startOfPage + itemsPerPage

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        // When details are fetched, set the states for the editable fields
        if (details.length > 0) {
            const detail = details[0]; // Assuming 'details' contains the profile data
            setName(detail.name);
            setDob(detail.dob);
            setEmail(detail.email);
            setPhone(detail.phone); // Assuming 'phone' is part of your details object
        }
    }, [details]);

    useEffect(() => {
        // Effect to decode token and set ID
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = parseJwt(token);
            const tokenID = decodedToken.id; // Access the id
            setID(tokenID); // This will trigger the second useEffect when the id state updates
        } else {
            window.alert('Please sign in to view this page')
            navigate('/')
        }
    }, []);

    useEffect(() => {
        // Effect to fetch details and events when id changes
        if (id) {
            console.log("Volunteer ID: ", id);
            setEvent([]); 
            setDetails([]);
            fetchDetails();
            fetchVolunteerEvents();
            fetchEvents();
        }
    }, [id, refreshTrigger]);
    
    const fetchDetails = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteer?volunteerID=' + id)
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
        .then(data => setDetails(data))
        .catch(error => console.error("Error fetching details: ", error))
    }

    const fetchVolunteerEvents = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteerevent?volunteerid=' + id)
        .then(response => {
            if (response.status === 401) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                if (text.trim() === '') {
                    return [];
                } else {
                    throw e; 
                }
            }
        })
        .then(data => {
            setVolunteeredEvent(data)
        })
        .catch(error => console.error("Error fetching volunteered events: ", error));
    }

    const eventSignUp = (eventid) => {
        let formData = new FormData()
        formData.append('eventid', eventid)
        formData.append('volunteerid', id)
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteerevent',
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
                console.log('Event signed up for')
                console.log("Events: ", volunteeredEvent)
                window.alert('Signed up successfully!')
                setRefreshTrigger(current => current + 1)
            }
        })
        .catch(error => console.error('Error signing up for event: ', error))
    }

    const eventUnregister = (eventid) => {
        const queryParams = `?volunteerid=${encodeURIComponent(id)}&eventid=${encodeURIComponent(eventid)}`;
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/volunteerevent${queryParams}`,
        {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 401){
                localStorage.removeItem("token")
                props.setSignedIn(false)
                return []
            }
            if (response.status === 200 || response.status === 204){
                console.log('Event unregistered')
                window.alert('Unregistered successfully!')
                setRefreshTrigger(current => current + 1)
            }
        })
        .catch(error => console.error('Error unregistering for event: ', error))
    }

    const fetchEvents = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/event')
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
        .then(data => setEvent(data))
        .catch(error => console.error("Error fetching events: ", error))
    }

    const updateProfile = () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('dob', dob);
        formData.append('email', email);
        formData.append('phone', phone);
    
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/volunteer?volunteerid=${id}`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            if (response.status === 200 || response.status === 204) {
                console.log('Profile updated successfully but no data returned.');
                window.alert('Profile updated successfully!');
                return
            }
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            window.alert('Error updating profile. Please try again later.');
        });
    };

    const detailsJSX = (
        <section className='flex-1 p-5 bg-white shadow-md rounded-lg mr-5 flex flex-col space-y-4'>
            <input
                className='text-xl p-2 border border-gray-300 rounded'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                className='p-2 border border-gray-300 rounded'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
                type="date"
            />
            <input
                className='p-2 border border-gray-300 rounded'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />
            <input
                className='p-2 border border-gray-300 rounded'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                type="tel"
                maxLength={11}
            />
            <button onClick={updateProfile} className='bg-blue-500 hover:bg-blue-700 self-center text-white font-bold py-2 px-4 rounded self-start'>Update Details</button>
        </section>
    );

    const eventsJSX = event.slice(startOfPage, endOfPage).map((item) =>(
        <section 
            key = {item.eventID}
            className={`p-4 m-2 rounded-lg border border-gray-300 ${extendEvent === item.eventID ? 'md:col-span-2' : 'col-span-1'
                    }`}>
            <Event
                event={item}
                signedIn={props.signedIn}
                extendEvent={extendEvent}
                setextendEvent={setextendEvent}
            />
            <div className='flex justify-end'>
            <button 
                onClick={() => eventSignUp(item.eventID)}
                disabled={volunteeredEvent.some(ve => ve.eventID === item.eventID)} // Disable if user has signed up
                className={`bg-gray-800 text-white px-4 py-2 rounded-md ${volunteeredEvent.some(ve => ve.eventID === item.eventID) 
                            ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'}`}>
                {volunteeredEvent.some(ve => ve.eventID === item.eventID) ? 'Registered' : 'Volunteer'}
            </button>

            </div>
        </section>
    ))
    
    let volunteerEventsJSX;
    if (volunteeredEvent.length > 0) {
        volunteerEventsJSX = volunteeredEvent.map((item) => (
        <section key={item.eventID} className='p-4 m-2 rounded-lg border border-gray-300'>
        <VolunteerEvent
            event={item}
            signedIn={props.signedIn}
            extendEvent={extendEvent}
            setextendEvent={setextendEvent}
        />
        <div className='flex justify-end'>
            <button 
            onClick={() => eventUnregister(item.eventID)}
            className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-green-500'>Unregister</button>
        </div>
        </section>
    ));
    } else {
        volunteerEventsJSX = (
            <div className="flex justify-center items-center w-full">
              <div className="bg-blue-200 text-center p-4 rounded-lg max-w-md mx-auto">
                You have not signed up for any events.
              </div>
            </div>
          );
    }

    return (
        <div className="bg-gray-100 p-2 sm:px-6 lg:px-8">
            <h1 className='text-4xl text-center p-2'>Profile</h1>
            <div className='p-5 flex'>
                {detailsJSX}
                <div className='flex-1 p-5 bg-white shadow-md rounded-lg mr-5'>
                    <Availability
                        id={id}
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                    />
                </div>
            </div>
            <div>
                <p className='text-2xl text-center'>Volunteered Events</p>
                {volunteerEventsJSX}
            </div>
            <div className='justify-center p-5'>
                    <p className='text-2xl text-center'>Upcoming Events</p>
                    {eventsJSX}
            </div>
        </div>
    )
}

export default VolunteerPage