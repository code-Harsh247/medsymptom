import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b-2 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-medium font-gs">MedSymptom</div>
        <Link
          to="formSection" // This should match the id or name of your FormSection component
          spy={true}
          smooth={true}
          offset={0}
          duration={400}
          className="cursor-pointer bg-[#1A1A1A] text-white px-4 py-2 rounded font-gs hover:bg-[#2A2A2A] transition duration-300 ease-in-out active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;