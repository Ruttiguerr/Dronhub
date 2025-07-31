import React from 'react';

/**
 * Simple footer displayed at the bottom of the page.  It contains
 * copyright information and can be extended in the future with
 * additional links or social media icons.
 */
const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 bg-gray-100 text-center text-gray-600 text-sm">
      <p>
        &copy; {new Date().getFullYear()} DronHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;