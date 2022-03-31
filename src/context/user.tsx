import { createContext, ReactNode, useCallback, useEffect, useReducer } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { IStorage } from "../interfaces/interfaces";

type State = {
  user?: User;
  setUser: (user?: User) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
};

type Action = {
  type: "SET_USER" | "UPDATE_NAME" | "UPDATE_EMAIL";
  payload?: any;
};

const UserContext = createContext<State>({
  setUser: () => {},
  updateName: () => {},
  updateEmail: () => {},
});

UserContext.displayName = "UserContext";

const { Provider, Consumer } = UserContext;

const reducer = (state: { user?: User }, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "UPDATE_NAME":
      return {
        user: {
          ...state.user,
          name: action.payload
        }
      };
    case "UPDATE_EMAIL":
      return {
        user: {
          ...state.user,
          email: action.payload
        }
      };
    default:
      return state;
  }
};

const UserProvider = ({ children, storage }: { children: ReactNode, storage: IStorage }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const navigate = useNavigate();

  const setUser = useCallback((user?: User) => {
    dispatch({ type: "SET_USER", payload: user });

    if (user) {
      storage.set("user", JSON.stringify(user));
    } else {
      storage.remove("user");
    }
  }, [storage]);

  const updateName = (name: string) => {
    dispatch({ type: "UPDATE_NAME", payload: name });

    storage.set("user", JSON.stringify({...state.user, name}));
  };

  const updateEmail = (email: string) => {
    dispatch({ type: "UPDATE_EMAIL", payload: email });

    storage.set("user", JSON.stringify({...state.user, email}));
  };



  return (
      <Provider value={{
        setUser,
        updateName,
        updateEmail,
        user: state.user
      }}
      >
        {children}
      </Provider>
  );
};

export { UserProvider, UserContext, Provider, Consumer };
