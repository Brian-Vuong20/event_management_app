import { createContext, useContext, useState } from "react";
const EventContext = createContext();
export const EventProvider = ({ children }) => {
  const [value, setValue] = useState([]);
  return (
    <EventContext.Provider value={{ value, setValue }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
