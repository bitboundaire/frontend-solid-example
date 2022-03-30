import { useContext } from "react";
import { UserContext } from "../context/user";

const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

export { useUserContext };
