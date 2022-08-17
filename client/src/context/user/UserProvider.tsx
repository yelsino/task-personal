import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import taskApi from "../../apis/taskApi";
import { User } from "../../interfaces/User";
import { UserContext } from "./UserContext";
import { userReducer } from "./UserReducer";

export interface UserState {
  user: User | null;
  logged: boolean;
  token: string;
}
interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: UserState = {
  user: null,
  logged: false,
  token: "",
};

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const createACount = async (username: string): Promise<boolean> => {
    const { data } = await taskApi.post("/login/new", { name: username });
    localStorage.setItem("token", data.token);
    dispatch({
      type: "SING_UP",
      payload: { token: data.token, user: data.usuario },
    });
    if (data.ok) return true;
    else return false;
  };

  const autoLogin = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      const { data } = await taskApi.get("/login/renew", {
        headers: { "x-access-token": token },
      });

      dispatch({
        type: "RE_AUTH",
        payload: { token: data.token, user: data.usuario },
      });
    } else {
      dispatch({ type: "SING_OUT" });
    }
  };

  useEffect(() => {
    // if (!state.logged)
    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        createACount,
        autoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
