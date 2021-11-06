import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [keyword, setKeyword] = useState("bug");
  const [limit, setLimit] = useState(1000);
  const [loading, setLoading] = useState(false)
  async function getPokemon(n) {
    // setPokemon([]);
    // if (n > 0 && keyword !== "") {
    //   setLimit(n);
    // } else {
    //   setLimit(100);
    // }
    setLoading(true)
    try {
      await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
      .then((result) => {
        result.data.results.forEach((poke) => {
          axios.get(poke.url).then((res) => {
            let details = res.data
            
            axios
              .get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`)
              .then((result) => {
                let details1 = result.data;
                // console.log(details1)
                axios.get(result.data.evolution_chain.url).then((outcome) => {
                  let details2 = outcome.data.chain;
                  // console.log(details2)
                  let fulldeets = { ...details, ...details1, ...details2 };

                  setPokemon((prevState) =>
                    [...prevState, fulldeets].sort((a, b) => a.id - b.id)
                  );
                   setLoading(false)
                });
              });
          });
        });
      });

     
    } catch (error) {
      console.log(error)
    }
    
      // post()
  }
  

  // function post() {
  //   console.log(pokemon)
  // }
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        limit,
        setLimit,
        keyword,
        setKeyword,
        getPokemon,
        loading,
        setLoading
      }}
    >
      <div>{children}</div>
    </PokemonContext.Provider>
  );
}