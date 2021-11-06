import React, {useContext} from 'react'
import { ThemeContext } from '../Context/ThemeContext';

function ThemedButton() {
    const {theme, setTheme} = useContext(ThemeContext);
    console.log(theme)


    async function changeTheme() {
        let randomBgColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
        let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
        await setTheme({
            backgroundColor: randomBgColor,
            color: randomColor
        })
    }

    return (
      <button 
      onClick={changeTheme}
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
        Funky Colors
      </button>
    );
  }

export default ThemedButton