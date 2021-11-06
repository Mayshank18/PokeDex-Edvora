import React, {useState, createContext} from 'react'


export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState({
        backgroundColor: "lightblue",
        color: "black"
    })

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
           <div>
              {children} 
           </div> 
        </ThemeContext.Provider>
    )


}