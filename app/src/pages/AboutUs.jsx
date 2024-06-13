import React from 'react'

/**
 * About Us page
 *  
 * @author Team 
 */

function AboutUs() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Established in 2019, the <span className="text-blue-500 font-semibold">ROSE</span> Foundation is a dedicated non-profit organization striving to eradicate cervical cancer across Malaysia. Our mission is rooted in providing accessible and effective cervical screening to women throughout the nation.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                        At <span className="text-blue-500 font-semibold">ROSE</span>, we take a multifaceted approach to combating cervical cancer. Through a combination of our state-of-the-art laboratory facilities and proactive community outreach programs, Program <span className="text-blue-500 font-semibold">ROSE</span> delivers comprehensive screening services to women from all walks of life. Our innovative methodology incorporates self-sampling, primary HPV testing, and a user-friendly mobile-based digital health platform, ensuring a streamlined process for follow-ups and facilitating prompt linkage to essential care and treatment when necessary.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                        Beyond our commitment to screening, the <span className="text-blue-500 font-semibold">ROSE</span> Foundation is deeply invested in raising awareness about cervical cancer prevention and the importance of early detection. Through educational campaigns and advocacy efforts, we strive to empower women with knowledge and resources to take charge of their reproductive health.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                        With the support of dedicated healthcare professionals, volunteers, and donors, the <span className="text-blue-500 font-semibold">ROSE</span> Foundation remains steadfast in its pursuit of a future free from the burden of cervical cancer. Join us in our mission to save lives and protect the well-being of women across Malaysia. Together, we can make a difference.
                    </p>
                </div>
            </div>
        </div>
    );
}



export default AboutUs