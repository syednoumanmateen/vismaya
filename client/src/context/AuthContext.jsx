import { createContext, useContext, useReducer } from "react"
import helper from "../utils/helper"

const AuthContext = createContext()

const AuthReducers = (state, action) => {
    switch (action.type) {
        case logIn:
            localStorage.setItem('user', { user: action.payload, isAuthenticated: true })
            return { user: { ...state, user: action.payload, isAuthenticated: true } }
        case logOut:
            localStorage.setItem('user', { user: action.payload, isAuthenticated: false })
            return { user: { ...state, user: action.payload, isAuthenticated: false } }
    }
}

const AuthProvider = ({ children }) => {
    const userData = localStorage.getItem("user")
    const [state, dispatch] = useReducer(AuthReducers, helper.isObject(userData) ? { user: localStorage.getItem('user').user, isAuthenticated: localStorage.getItem('user').isAuthenticated } : { user: {}, isAuthenticated: false })

    return (
        <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }