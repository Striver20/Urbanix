import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Urbanix</h2>
            <p className="text-gray-400">
              The best place to buy amazing products.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400">
              1234 E-Shop St, E-Commerce City, EC 12345
            </p>
            <p className="text-gray-400">Email: support@eshop.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.488v-9.294H9.69v-3.622h3.123V8.411c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.586l-.467 3.622h-3.119V24h6.116c.729 0 1.326-.597 1.326-1.324V1.325C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.94 4.94 0 002.163-2.723c-.951.555-2.005.96-3.127 1.184a4.92 4.92 0 00-8.38 4.482c-4.088-.2-7.72-2.165-10.148-5.144a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.903 4.903 0 01-2.23-.616c-.053 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084c.626 1.956 2.444 3.377 4.604 3.416a9.865 9.865 0 01-6.102 2.105c-.397 0-.79-.023-1.175-.069a13.945 13.945 0 007.557 2.213c9.054 0 14.002-7.496 14.002-13.986 0-.21-.005-.423-.014-.633A9.936 9.936 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.67.015-4.947.072-1.375.062-2.63.337-3.637 1.343C2.524 2.524 2.25 3.78 2.188 5.155 2.131 6.432 2.116 6.843 2.116 10.102s.015 3.67.072 4.947c.062 1.375.337 2.63 1.343 3.637 1.007 1.007 2.262 1.281 3.637 1.343 1.277.058 1.688.072 4.947.072s3.67-.015 4.947-.072c1.375-.062 2.63-.337 3.637-1.343 1.007-1.007 1.281-2.262 1.343-3.637.058-1.277.072-1.688.072-4.947s-.015-3.67-.072-4.947c-.062-1.375-.337-2.63-1.343-3.637-1.007-1.007-2.262-1.281-3.637-1.343C15.67.015 15.259 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.882 0 1.44 1.44 0 012.882 0z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.6 0h-15.2c-2.42 0-4.4 1.98-4.4 4.4v15.2c0 2.42 1.98 4.4 4.4 4.4h15.2c2.42 0 4.4-1.98 4.4-4.4v-15.2c0-2.42-1.98-4.4-4.4-4.4zm-11.76 20.4h-2.72v-10.8h2.72v10.8zm-1.36-12.3c-.87 0-1.58-.71-1.58-1.58s.71-1.58 1.58-1.58 1.58.71 1.58 1.58-.71 1.58-1.58 1.58zm12.36 12.3h-2.72v-5.22c0-1.24-.02-2.84-1.74-2.84-1.74 0-2.01 1.36-2.01 2.75v5.31h-2.72v-10.8h2.61v1.48h.04c.36-.69 1.25-1.42 2.56-1.42 2.73 0 3.24 1.8 3.24 4.14v6.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between">
          <p className="text-gray-400">
            &copy; 2024 E-Shop. All rights reserved.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="px-4 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 rounded-r-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
