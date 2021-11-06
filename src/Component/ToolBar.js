import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext'

function Toolbar() {
    const {theme, setTheme} = useContext(ThemeContext)
    return (
        <div style={{color: theme.color}}>
            Toolbar 
        </div>
    )
}

export default Toolbar