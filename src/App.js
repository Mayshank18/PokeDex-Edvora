import './App.css';
import PokemonList from './Component/PokemonList';
import PokemonTable from './Component/PokemonTable';
import ThemedButton from './Component/ThemedButton';
import Toolbar from './Component/ToolBar';
import { PokemonProvider } from './Context/PokemonContext';
import { ThemeProvider } from './Context/ThemeContext';


function App() {
  return (
    <div className="App">
       
      {/* <ThemeProvider> */}
        <PokemonProvider>
          <PokemonList/>
          {/* <PokemonTable/> */}
        {/* <ThemedButton /> */}
        </PokemonProvider> 
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;