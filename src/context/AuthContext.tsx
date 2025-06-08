import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import axios from 'axios';


interface AuthContextData {
  user: UserProps;
  errorCreate: ErrorCreate;
  isAuthenticated: boolean;
  signIn: (credentials: SiginInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  errorMessage?: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

interface SiginInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface ErrorCreate {
  errorMessage?: string;
}


export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, '@goallist.token', { path: '/' });
    Router.push('/login');
  } catch (error) {
    console.log(error);
    console.log("Error ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  const [errorCreate, setErrorCreate] = useState<ErrorCreate>();

  useEffect(() => {
    const { '@goallist.token': token } = parseCookies();
    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;
        setUser({
          id,
          name,
          email
        });
      })
        .catch(() => {
          signOut();
        })
    }

  }, []);


  async function signIn({ email, password }: SiginInProps) {

    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      const { id, name, email: responseEmail, token } = response.data;


      setCookie(undefined, '@goallist.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({
        id,
        name,
        email: responseEmail,
        errorMessage: '',
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiMessage = error.response.data.message;
        setUser(apiMessage);
        setUser((prevUser) => prevUser ? { ...prevUser, errorMessage: apiMessage } : null);
      } else {
        console.log("Erro inesperado:", error);
        setUser((prevUser) => prevUser ? { ...prevUser, errorMessage: "Erro ao entrar, tente novamente." } : null);
      }
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      });

      Router.push('/login');

      setErrorCreate({
        errorMessage: '',
      })

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiMessage = error.response.data.message;
        setErrorCreate(apiMessage);
        // Definindo a mensagem de erro no estado do usuário
        setErrorCreate((prevUser) => prevUser ? { ...prevUser, errorMessage: apiMessage } : null);
      } else {
        console.log("Erro inesperado:", error);
        setErrorCreate((prevUser) => prevUser ? { ...prevUser, errorMessage: "Erro ao entrar, tente novamente." } : null);
      }
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, '@goallist.token', { path: '/' });
      Router.push('/login');
      setUser(null);
    } catch (error) {
      console.log(error);
      console.log("Error ao deslogar");
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      errorCreate,
      isAuthenticated,
      signIn,
      signUp,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}