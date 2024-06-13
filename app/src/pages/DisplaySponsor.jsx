import React, { useState, useEffect } from 'react';
/**
 * Display Sponsor page
 * 
 * This page is in charge of displaying a list of sponsor who signed up.
 * Only admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

function DisplaySponsor() {
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSponsors();
    }, []);

    const fetchSponsors = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/sponsor')
            .then(response => response.json())
            .then(data => {
                setSponsors(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching sponsors:', error);
                setLoading(false);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Sponsors</h1>
                <p className="text-lg text-center mb-8 text-gray-600">This page displays a list of signed-up sponsors along with their email addresses.</p>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <ul className="grid grid-cols-1 gap-4">
                        {sponsors.map((sponsor, index) => (
                            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <p className="text-lg text-gray-800">{sponsor.email}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DisplaySponsor;
