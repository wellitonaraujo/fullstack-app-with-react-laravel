import { createContext, useContext, useState, ReactNode } from "react";

type User = {
    // Propriedades do usuário
};

type Notification = string;

type ContextType = {
    user: User;
    setUser: (user: User) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    notification: Notification;
    setNotification: (message: Notification) => void;
};

const StateContext = createContext<ContextType>({
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {},
    notification: "",
    setNotification: () => {},
});

type ContextProviderProps = {
    children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User>({});
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );
    const [notification, _setNotification] = useState<Notification>("");

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = (message: Notification) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
