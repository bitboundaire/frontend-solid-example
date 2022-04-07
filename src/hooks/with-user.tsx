import { ElementType, useEffect } from "react";
import { useUserContext } from "./use-user-context";
import { IStorage } from "../interfaces/storage";
import { LOGIN_ROUTE } from "../utils/constants";

interface WithUserProps {
  storage: IStorage;
  navigation: Function;
}

const withUser = (Component: ElementType, dependencyProps: WithUserProps) => (props: any) => {
  const { storage, navigation } = dependencyProps;

  const { setUser } = useUserContext();

  useEffect(() => {
    const user = storage.get("user");

    if (user.id) {
      setUser(user);
    } else {
      navigation(LOGIN_ROUTE);
    }
  }, [navigation, setUser, storage]);

  return <Component {...props} />;
};

export { withUser };
