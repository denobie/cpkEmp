import {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [userLogged, setUserLogged] = useState(() => {
        const userLocal = localStorage.getItem("userLogged");

        return userLocal ? JSON.parse(userLocal) : [];
    });

    useEffect(() => {
        if (userLogged !== undefined) {
            localStorage.setItem('userLogged', JSON.stringify(userLogged));
        }

    }, [userLogged]);

    const handleSetUser = (propsUser) => {
        setUserLogged([])
        localStorage.removeItem(userLogged);
        setUserLogged(propsUser);
    }

    return (
        <UserContext.Provider value={{ userLogged: userLogged ?? [], handleSetUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;