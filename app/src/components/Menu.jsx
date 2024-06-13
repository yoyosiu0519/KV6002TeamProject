import { Link } from 'react-router-dom';
/**
 * Menu component
 *  
 * @author Team 
 */
function Menu(props) {
    return (
        <ul className="flex flex-col md:flex-row justify-evenly text-lg font-semibold bg-blue-200">
            <li>
                <Link to="/" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">Home</Link>
            </li>
            <li>
                <Link to="/about" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">About Us</Link>
            </li>
            <li>
                {!props.signedIn && <Link to="/volunteer-sign-up" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">Become a Volunteer</Link>}
            </li>
            <li>
                {props.signedIn === false && <Link to="/becomeparticipant" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">Become a Participant</Link>}
                {props.signedIn && props.roletype === 'participant' && <Link to="/participant" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">My Profile</Link>}
            </li>
            <li>
                {props.signedIn && props.roletype === 'volunteer' && <Link to="/volunteer" className="px-8 py-4 text-gray-800 hover:text-blue-500 transition duration-300">Volunteer</Link>}
            </li>
        
            <li>
            {props.signedIn && props.roletype === 'admin' && props.position ==="head" && <Link to="/admin-sign-up" className="px-8 hover:text-blue-500 transition duration-300">Add New Admin</Link>}
            </li>

            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/new-event" className="px-8 hover:text-blue-500 transition duration-300">Post Event</Link>}
            </li>
            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/check-participant" className="px-8 hover:text-blue-500 transition duration-300">Pending Participant Application </Link>}
            </li>
            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/eventparticipant" className="px-8 hover:text-blue-500 transition duration-300">Event Participant</Link>}
            </li>
            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/sponsor" className="px-8 hover:text-blue-500 transition duration-300">Sponsor</Link>}
            </li>
            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/eventvolunteer" className="px-8 hover:text-blue-500 transition duration-300">Event Volunteer</Link>}
            </li>
            

        </ul>
    );
}

export default Menu;
