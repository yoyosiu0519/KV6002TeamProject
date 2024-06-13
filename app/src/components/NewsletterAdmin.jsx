import React from 'react';
import { useState, useEffect } from 'react'

/**
 * Display Newsletter Subscribers
 * 
 * Display a list of newsletter subscribers for the admin to view & delete.
 *
 * @author Aiden Anderson W21047714
 */

function NewsletterAdmin() {

    const [newsletter, setNewsletter] = useState([])
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
            setNewsletter(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    // Fetch the newsletter list from the server.
    useEffect(() => {
        fetch("https://w20021570.nuwebspace.co.uk/assessment/api/newsletter")
        .then( response => handleResponse(response))
        .then( json => handleJSON(json))
        .catch( err => { console.log(err.message) })
    }, [])

    // Handle the search input.
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // Filter the newsletter list based on the search input.
    const searchEmail = (newsletter) => {
        newsletter.email.toLowerCase().includes(search.toLowerCase())
    }

    // Display the newsletter list.
    const listOfNewsletter = newsletter.filter(searchEmail).map((newsletter, index) => 
        <section key = {index}>
            <p>{newsletter.email}</p>
        </section>
    )

    // Remove a reader from the newsletter list.
    const removeReader = () => {
        alert('Deleted Reader');

        return fetch('https://w20021570.nuwebspace.co.uk/assessment/api/newsletter?email=' + newsletter, 
          {method: 'DELETE'})
          .then( response => handleResponse(response))
          .catch( err => { console.log(err.message) })
        }

  return (
    <div className="container">

        <h1>Newsletter</h1>

        <input 
        value={search} 
        onChange={handleSearch} 
        type="text" 
        placeholder="Search For Reader" 
        name="email"/>

        {listOfNewsletter}

        <button
            type="submit" 
            onClick={(e) => { e.preventDefault(); removeReader()} }>
            Delete Reader
        </button>
    </div>
  )

}

export default NewsletterAdmin