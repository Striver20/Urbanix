import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/auth";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <Layout>
      <h1 className="text-4xl font-bold">Home Page</h1>
      <p>{JSON.stringify(auth)}</p>
      <p>{auth.token}</p>
    </Layout>
  );
};

export default Home;
