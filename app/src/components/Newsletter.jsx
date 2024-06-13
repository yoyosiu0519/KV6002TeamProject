import React from 'react'
import { useState } from 'react'

/**
 * Newsletter
 * 
 * This is a form for the user to sign up to the newsletter.
 *
 * @author Aiden Anderson W21047714
 */

function Newsletter() {

  const [newsEmail, setNewsEmail] = useState('');

  /**
   * Handles the response from the server.
   * 
   * @param {object} response - The response object from the server.
   * @returns {Promise} Promise resolving to JSON data if response is successful, else throws an error.
   * @throws {Error} If the response status is not 200.
   */
  const handleResponse = (response) => {
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error("invalid response: " + response.status)
    }
  }

  // Handle the form submission.
  const handleSubmit = () => {
    alert('You have submitted');

    return fetch('https://w20021570.nuwebspace.co.uk/assessment/api/newsletter?email=' + newsEmail, 
    { method: 'POST' })
    .then( response => handleResponse(response))
    .catch( err => { console.log(err.message) })
  }

  return (
    <div className="mt-8 mb-4">
    <div className="bg-white rounded-lg shadow p-8 max-w-lg">
        <h1 className="text-center text-2xl font-semibold mb-4">Newsletter</h1>
        <p className="text-center mb-4">Sign up for our newsletter to receive the latest news and updates</p>
        <form>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold">Sign Up Here:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Enter Your Email"
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    maxLength="50"
                    name="email"
                    className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            >
                Submit
            </button>
        </form>
    </div>
</div>
);
}


export default Newsletter