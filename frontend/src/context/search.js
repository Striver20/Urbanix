import { createContext, useState, useContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });
  return (
    <SearchContext.Provider value={{ auth, setAuth }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const { auth, setAuth } = useContext(SearchContext);
  return [auth, setAuth];
};

export { SearchProvider, useSearch };
