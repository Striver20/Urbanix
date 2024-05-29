import React, { Children } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        {children}
      </main>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Urbanix",
  description: "Your dailt e-commerce website",
  keywords: "Urbanix,mern,react,node,mongoose,mongodb,database",
  author: "Ashit Verma",
};
export default Layout;
