import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const { values, setValues } = useContext(SearchContext);
  return [values, setValues];
};

export { SearchProvider, useSearch };
