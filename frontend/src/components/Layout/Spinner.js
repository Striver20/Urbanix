import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      navigate("/login");
    }
  }, [count, navigate]); // count make it run evertime count value changes

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ClipLoader
        color={"#ffffff"}
        loading={true}
        cssOverride={CSSProperties}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-xl font-semibold m-2">
        Redirecting you to Login Page in {count}
      </p>
    </div>
  );
};

export default Spinner;
