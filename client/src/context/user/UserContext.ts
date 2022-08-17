import { createContext } from "react";
import { User } from "../../interfaces/User";

interface Props {
  user: User | null;
  logged: boolean;
  token: string;
  createACount: (name: string) => Promise<boolean>;
  autoLogin: () => void;
}

export const UserContext = createContext<Props>({} as Props);
