import { useNavigate } from "react-router-dom";
import { createContext, useState, useContext } from "react";
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()


    const login = (user) => {
        setUser(user)
        localStorage.setItem('jwt', `${user.token}`)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('jwt')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}

