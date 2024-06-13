import React from 'react'
import { IoMdRose } from "react-icons/io";

/**
 * Header
 *
 * Header with some information.
 *
 * @author Aiden Anderson
 */

function Header() {
  return (
    <header className="bg-blue-300 py-6">
      <div className="flex items-center justify-center">
        <IoMdRose className="text-black text-4xl mt-1 mr-2" />
        <h1 className="text-black text-4xl font-bold mt-4">ROSE</h1>
      </div>
    </header>
  );
}


export default Header