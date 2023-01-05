import { useEffect } from "react";
import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [updateUser, result] = useDbUpdate("/users/");
  const [users, error, loading] = useDbData("/users/");

  useEffect(() => {
    if (user && !error && !loading && !Object.keys(users).includes(user.uid)) {
      updateUser({
        [user.uid]: { displayName: user.displayName, email: user.email },
      });
    }
  }, [error, loading, user, updateUser]);

  return [user, error, loading];
};
