import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout
      title="About Us - Urbanix"
      description="Learn about Urbanix - Your premium fashion destination for modern style and quality"
      keywords="about urbanix, fashion company, premium clothing, modern style"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              About
              <span className="block text-purple-400">Urbanix</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Redefining fashion for the modern urbanite with premium quality
              and timeless style
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Started as my college project in 2023, Urbanix began
              when I got frustrated with how hard it was to find decent clothes
              online that actually looked like the photos. I wanted to create
              something better - a place where you know exactly what you're
              getting.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              What started as a simple e-commerce project has turned into
              something I'm genuinely excited about. I personally review every
              product before listing it, and I only add things I'd actually buy
              myself. It's still small, but it's growing steadily with customers
              who appreciate honest product descriptions and quality items.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Our Collection
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Since 2023
                </h3>
                <p className="text-gray-600">
                  Started as a college project, now serving customers who want
                  honest reviews and quality products
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our core principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Quality First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I test every product myself before adding it to the store. If
                  I wouldn't wear it or give it to a friend, it doesn't make it
                  on the site.
                </p>
              </div>
            </div>

            {/* Sustainability */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Honest Reviews
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No fake reviews or misleading photos. What you see is what you
                  get, with honest product descriptions based on real usage.
                </p>
              </div>
            </div>

            {/* Innovation */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Always Learning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I'm constantly improving the site based on feedback. New
                  features, better search, and more products are added
                  regularly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Check out the products!
          </h2>
          <p className="text-gray-600 mb-6">
            Browse through the collection and let me know what you think.
          </p>
          <Link
            to="/categories"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Categories
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
