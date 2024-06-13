/**
 * ParticipantEvent Component
 *
 * This component allow users to sign in.
 * It sets user roles based on the user role in the databse. 
 * It provides a token for validation. 
 * 
 * @author Team
 */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SignIn(props) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [signInError, setSignInError] = useState(false)
    const errorColour = signInError ? "bg-red-200" : "bg-slate-100"
    const navigate = useNavigate()

    const parseJwt = (token) => {
        const decode = JSON.parse(atob(token.split('.')[1]));
        console.log(decode);
        if (decode.exp * 1000 < new Date().getTime()) {
            signOut();
            console.log('Time Expired');
            window.alert("Session Expired")
        }
        return decode;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = parseJwt(token);
            props.setUserID(decodedToken.id)
            props.setRoleType(decodedToken.role)
            props.setPosition(decodedToken.position)
            props.setSignedIn(true);
        }
    }, []);

    const signIn = () => {
        const encodedString = btoa(username + ':' + password)
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/token',
            {
                method: 'GET',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(response => {
                if (response.status === 401) {
                    setSignInError(true)
                    window.alert("Invalid Username or Password")
                    return
                }
                if (response.status === 200 || response.status === 204) {
                    return response.json()
                }
            })
            .then(data => {
                if (data && data.token) {
                    localStorage.setItem("token", data.token);
                    const decodedToken = parseJwt(data.token);
                    props.setUserID(decodedToken.id)
                    props.setRoleType(decodedToken.role)
                    props.setPosition(decodedToken.position)
                    props.setSignedIn(true);
                    navigate("/")
                }
            })
            .catch(error => console.log(error))  
    }

    const signOut = () => {
        localStorage.removeItem("token")
        setUserName("")
        setPassword("")
        props.setSignedIn(false)
        props.setPosition("")
        navigate("/")
    }

    return (
        <div className="bg-slate-700 shadow-lg p-2 text-md text-right">
            {!props.signedIn && <div>
                <input
                    type="text"
                    placeholder="Username"
                    className={'p-1 mx-2 rounded-md' + errorColour}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={'p-1 mx-2 rounded-md' + errorColour}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    value="Sign In"
                    className="py-1 px-2 mx-2 bg-blue-500 hover:bg-blue-800 text-white font-semibold rounded-md"
                    onClick={signIn}
                />
            </div>
            }
            {props.signedIn && <div>
                <input
                    type="submit"
                    value="Sign Out"
                    className="py-1 px-2 mx-2 bg-orange-500 hover:bg-orange-600 font-semibold text-white rounded-md"
                    onClick={signOut}
                />
            </div>
            }
            {signInError}
        </div>
    )
}

export default SignIn
