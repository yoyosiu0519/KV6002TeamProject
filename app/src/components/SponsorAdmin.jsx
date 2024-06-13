import React from 'react';
import { useState, useEffect } from 'react'

/**
 * Display Sponsor Subscribers
 * 
 * Display a list of Sponsor subscribers for the admin to view & delete.
 *
 * @author Aiden Anderson W21047714
 */

function SponsorAdmin() {

    const [sponsor, setSponsor] = useState([])
    const [search, setSearch] = useState("")

    // Handles the response from the server.
    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    // Handles the JSON response from the server.
    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setSponsor(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    // Fetch the sponsor list from the server.
    useEffect(() => {
        fetch("https://w20021570.nuwebspace.co.uk/assessment/api/sponsor")
        .then( response => handleResponse(response))
        .then( json => handleJSON(json))
        .catch( err => { console.log(err.message) })
    }, [])

    // Handle the search input.
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // Filter the sponsor list based on the search input.
    const searchEmail = (sponsor) => {
        sponsor.email.toLowerCase().includes(search.toLowerCase())
    }

    // Display the sponsor list.
    const listOfSponsor = sponsor.filter(searchEmail).map((sponsor, index) => 
        <section key = {index}>
            <p>{sponsor.email}</p>
        </section>
    )

    // Remove a sponsor from the sponsor list.
    const removeSponsor = () => {
        alert('Deleted Sponsor');

        return fetch('https://w20021570.nuwebspace.co.uk/assessment/api/sponsor?email=' + sponsor, 
          {method: 'DELETE'})
          .then( response => handleResponse(response))
          .catch( err => { console.log(err.message) })
        }

    return (
        <div className="container">

            <h1>Sponsor</h1>

            <input 
            value={search} 
            onChange={handleSearch} 
            type="text" 
            placeholder="Search For Sponsor" 
            name="email"/>

            {listOfSponsor}

            <button 
                type="submit" 
                onClick={(e) => { e.preventDefault(); removeSponsor()} }>
                Delete Sponsor
            </button>
        </div>
    )

}

export default SponsorAdmin