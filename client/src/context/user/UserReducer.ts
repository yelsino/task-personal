import { User } from "../../interfaces/User";
import { UserState } from "./UserProvider";

interface AuthProps {
  token: string;
  logged?: boolean;
  user: User | null;
}

export type UserAction =
  | { type: "RE_AUTH"; payload: AuthProps }
  | { type: "SING_UP"; payload: AuthProps }
  | { type: "SING_IN"; payload: AuthProps }
  | { type: "SING_OUT"; payload?: AuthProps }
  | { type: "RESTORE"; payload: { uid: string } };

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "RE_AUTH":
    case "SING_IN":
    case "SING_UP":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        logged: true,
      };
    case "SING_OUT":
      return {
        ...state,
        token: "",
        logged: false,
        user: null,
      };
    default:
      return state;
  }
};
