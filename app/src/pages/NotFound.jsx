import React from 'react'

import cat from '../assets/cat.jpg'

/**
 * 404 page
 *
 * This is the let the user know they have gone to a page that doesn't exist.
 *
 * @author Aiden Anderson W21047714
 */

function NotFound () {
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <div>
        <img src={cat} alt="Cat of Disappointment."/>
      </div>  
    </div>
  )
}

export default NotFound