import { createContext, useContext, useReducer } from "react"
import helper from "../utils/helper"

const ThemeContext = createContext()

const ThemeReducers = (state, action) => {
    switch (action.type) {
        case "light":
            localStorage.setItem('theme', 'light')
            return 'light'
        case "dark":
            localStorage.setItem('theme', 'dark')
            return 'dark'
    }
}

const ThemeProvider = ({ children }) => {
    const themeData = localStorage.getItem("theme")
    const [state, dispatch] = useReducer(ThemeReducers, themeData)

    return (
        <ThemeContext.Provider value={{ themeState: state, themeDispatch: dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext)

export { ThemeProvider, useTheme }