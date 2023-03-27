import { createContext, useState } from "react";
export const Pages_data = createContext(null);

function Context({ children }) {
  const [pages, setPages] = useState();

  return (
    <Pages_data.Provider value={{ pages, setPages }}>
      {children}
    </Pages_data.Provider>
  );
}

export default Context;
