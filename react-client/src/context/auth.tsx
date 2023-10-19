import { createContext, useContext, useState, ReactNode } from "react";

type User = {
    name: string;
};

type Notification = string;

type AuthContextData = {
    user: User;
    setUser: (user: User) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    notification: Notification;
    setNotification: (message: Notification) => void;
};

const AuthContext = createContext<AuthContextData>({
    user: { name: "Welliton" },
    setUser: () => {},
    token: null,
    setToken: () => {},
    notification: "",
    setNotification: () => {},
});

type ContextProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User>({ name: "Welliton" });
    const [token, _setToken] = useState<string | null>();
    const [notification, _setNotification] = useState<Notification>("");

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            //
        } else {
            //
        }
    };

    const setNotification = (message: Notification) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <AuthContext.Provider
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
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(AuthContext);
