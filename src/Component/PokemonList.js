import React , { useContext,useState, useEffect} from 'react'
import { PokemonContext } from '../Context/PokemonContext'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Row, Col, Table } from 'react-bootstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

  const useStylesText = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const BorderLinearProgress = withStyles((theme,value) => ({
    root: {
      height: 8,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: value > 50 ? '#1a90ff' : 'pink',
    },
  }))(LinearProgress);

function PokemonList() {
    const {pokemon, keyword, setKeyword, setPokemon, limit, setLimit, getPokemon, loading, setLoading} = useContext(PokemonContext)
    // const [keyword, setKeyword] = useState("bu")
    const classes = useStyles();
    const textfield = useStylesText()
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const styles = {

    "bug" : '#ab2',
    "poison" : "#a59",
    "normal" : "#aa9",
    "fire" : "#f42",
    "water" : "#39f",
    "electric" : "#fc3",
    "grass" : "#7c5",
    "ice" : "#6cf",
    "fighting" : "#b54",
    "ground" : "#db5",
    "flying" : "#89f",
    "psychic" : "#f59",
    "rock" : "#ba6",
    "ghost" : "#66b",
    "dragon" : "#76e",
    "dark" : "#754",
    "steel" : "#aab",
    "fairy" : "#e9e"
  
  }

  async function change(e) {
    e.preventDefault(e)
    setLoading(true)
    await setKeyword(e.target.value)
    setLoading(false)
    // await getPokemon(200)
    
  }

  useEffect(() => {
   console.log(pokemon)
  }, [])


    return (
        <div>
            <form 
            
            className={textfield.root} noValidate autoComplete="off">
                  <TextField 
                  id="standard-basic" 
                  label="Search Pokemon"
                  onChange={(e)=> {change(e)}} />
                 {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                 <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
            </form>

                {loading ? 
              <Loading />
              :

              <div className="container">
            {pokemon?.filter((e) => e.name?.toLowerCase().includes(keyword?.toLowerCase()) || e.types[0]?.type.name.toLowerCase().includes(keyword?.toLowerCase()) || e.types[1]?.type.name.toLowerCase().includes(keyword?.toLowerCase())).map((poke, i)=>(
                <div 
                className="container-items"
                key={i}>
                   
                    <h3 style={{margin: 0}} className="text-capitalize">  <img src={poke?.sprites?.front_default} /> #{poke.id} {poke.name} </h3>
                    
                    <Row className="justify-content-center">
                    <div style={{width: "fit-content", padding: ".4em", margin:".2em", borderRadius: ".9em", border: "1px solid black", backgroundColor: styles[poke.types[0].type.name]}}>
                        {poke.types[0].type.name} 
                    </div> 
                    {poke.types[1] ? 
                     <div style={{width: "fit-content", padding: ".4em", margin:".2em", borderRadius: ".9em", border: "1px solid black", backgroundColor: styles[poke.types[1].type.name]}}>
                     {poke.types[1].type.name}
                    </div>
                    
                    : ""}
             
                    </Row>
                    <div className={classes.root}>
      <Accordion expanded={expanded === i} onChange={handleChange(i)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Pokédex data</Typography>
          <Typography className={classes.secondaryHeading}>National No : {poke.id} </Typography>
        </AccordionSummary>
        <AccordionDetails>
        
                <Col sm={6} className="text-right">
                <p> Height: </p>
                <p> Weight: </p> 
                <p style={{height: "5em"}}> Abilities: </p>
                <p>Local No: </p> 
           
           </Col>
           <Col sm={6} className="text-left">

            <p>
           {poke.height / 100} m 
           </p>
           <p>
           {poke.weight / 100} kg
           </p>
           <p>
           {poke.abilities.map((ability,i) => (
               <li> {ability.ability.name} {ability.is_hidden ? " (hidden) " : "" } </li>
           ))}
            </p>

           {poke.game_indices.map((ind, i) => (
               <div>
                   {ind.game_index} | {ind.version.name}
               </div>
           ))}

           </Col>
          
          
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === i+1.5} onChange={handleChange(i+1.5)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Training</Typography>
          <Typography className={classes.secondaryHeading}>
          growth rate : {poke.growth_rate.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
            <Col sm={6} className="text-right">
                <p>
                     base experience : 
                </p>
                <p>
                     base happiness : 
                </p>
                <p>
                     capture rate : 
                </p>
                <p>
                     growth rate : 
                </p>
             
              
             </Col>

            <Col sm={6} className="text-left">
                 <p>
                    {poke.base_experience}
                </p>
                <p>
                    {poke.base_happiness}
                </p>
                <p>
                    {poke.capture_rate}
                </p>
                <p>
                    {poke.growth_rate.name}
                </p>
              
             </Col>




        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === i+2.22}>
        <AccordionSummary
          
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Breeding</Typography>
          <Typography className={classes.secondaryHeading}>
          Egg Group : 
                     
                    {poke?.egg_groups[0]?.name ?
                    <li> {poke.egg_groups[0].name} </li> : "" }
                    {poke?.egg_groups[1]?.name ?
                    <li> {poke.egg_groups[1].name} </li> : "" }
                   
                
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === i+3.125} onChange={handleChange(i+3.125)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Base stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Col sm={4} className="text-right">
               
               {poke.stats.map((stat,i) => (
                    <p 
                    key={i}
                    style={{height:"2em"}}>
                     {stat.stat.name} : 
                    
                    </p> 
                    
               ))}
               
              
             </Col>

            <Col sm={8} className="text-center">
            {poke.stats.map((stat,i) => (
                    <p  
                    key={i}
                    >
                     {stat.base_stat} 
                     <BorderLinearProgress variant="determinate" value={stat.base_stat/2.55} />
                    </p> 
               ))}
            
              
             </Col>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === i+4.425} onChange={handleChange(i+4.425)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>Evolution</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <Col sm={6} className="text-center">
               
        <div
            style={{height: "8em", border: "1px solid black", overflow: "scroll"}}>
                
                <p className="py-3"> Level 1 </p>
            </div>

        {poke.evolves_to?.map((evo,i) => (
            <>
            <div
            style={{height: "8em", border: "1px solid black", overflow: "scroll"}}>
            {evo.evolution_details.map((ev,i) => (
            
            <p 
            className="py-3"
            key={i}>
                <div>
                    {ev?.item?.name}
                </div>
                <div>
                    {ev?.gender}
                </div>
                <div>
                    {ev?.held_item?.name}
                </div>
                <div>
                    {ev?.location?.name}
                </div>
                <div>
                    {ev?.min_level ? " Level " + ev?.min_level : ""}
                </div>
                <div>
                    {ev?.party_species?.name}
                </div>
                <div>
                    {ev?.party_type?.name}
                </div>
                <div>
                    {ev?.known_move?.name}
                </div>
                <div>
                    {ev?.relative_physical_stats}
                </div>
                <div>
                    {ev?.time_of_day !== "" ? ev?.time_of_day : ""}
                </div>
                <div>
                    {ev?.trigger.name === "trade" ? "Trade" : ""}
                </div>
                <div>
                    {ev?.known_move_type?.name}
                </div>
                <div>
                    {ev?.min_affection? "max affection" : ""}
                </div>
                <div>
                    {ev?.min_beauty? "max beauty" : ""}
                </div>
                <div>
                    {ev?.min_happiness? "max happiness" : ""}
                </div>
                <div>
                    {ev?.needs_overworld_rain ? "Rain" : ""}
                </div>

            </p>
            ))}
            </div>

            {evo.evolves_to.map((e,i)=> (
                <>
                <div
            style={{height: "8em", border: "1px solid black", overflow: "scroll"}}>
            {e.evolution_details.map((ev,i) => (
            
            <p 
            
            className="py-3"
            key={i}>
                <div>
                    {ev?.item?.name}
                </div>
                <div>
                    {ev?.gender}
                </div>
                <div>
                    {ev?.held_item?.name}
                </div>
                <div>
                    {ev?.location?.name}
                </div>
                <div>
                    {ev?.min_level ? " Level " + ev?.min_level : ""}
                </div>
                <div>
                    {ev?.party_species?.name}
                </div>
                <div>
                    {ev?.party_type?.name}
                </div>
                <div>
                    {ev?.known_move?.name}
                </div>
                <div>
                    {ev?.relative_physical_stats}
                </div>
                <div>
                    {ev?.time_of_day !== "" ? ev?.time_of_day : ""}
                </div>
                <div>
                    {ev?.trigger.name === "trade" ? "Trade" : ""}
                </div>
                <div>
                    {ev?.known_move_type?.name}
                </div>
                <div>
                    {ev?.min_affection? "max affection" : ""}
                </div>
                <div>
                    {ev?.min_beauty? "max beauty" : ""}
                </div>
                <div>
                    {ev?.min_happiness? "max happiness" : ""}
                </div>
                <div>
                    {ev?.needs_overworld_rain ? "Rain" : ""}
                </div>

            </p>
            ))}
            </div>
                </>
            ))}
            
            </>
        ))}

        
               
              
             </Col>

            <Col sm={6} className="text-center">

            <div
                style={{height: "8em", border: "1px solid black", overflow: "scroll"}}
            >
                    <p 
                    className="py-3">
                        {poke.species.name} {poke.is_baby? " (baby) "  : ""} 
                    </p>
                </div>

            {poke.evolves_to?.map((ev,i) => (
                <>
                <div
                style={{height: "8em", border: "1px solid black", overflow: "scroll"}}
            
                key={i}>
                    <p 
                    className="py-3">
                        {ev.species.name}
                    </p>
                </div>

                {ev.evolves_to.map((e,i) => (
                    <>
                    <div
                style={{height: "8em", border: "1px solid black", overflow: "scroll"}}
            
                key={i}>
                    <p 
                    className="py-3">
                        {e.species.name}
                    </p>
                </div>
                    </>
                ))}
                </>

            ))}

        
            
              
             </Col>



        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === i+5.511} onChange={handleChange(i+5.511)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography className={classes.heading}>Moves learned</Typography>
          <Typography className={classes.secondaryHeading}>
          * Sort Alphabetically
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Col sm={6} className="text-right">
               
               {poke.moves.sort((a,b)=> a.move.name.localeCompare(b.move.name)).map((move,i) => (
                    <p 
                    key={i}
                    >
                     {move.move.name} : 
                    
                    </p> 
                    
               ))}
               
              
             </Col>

            <Col sm={6} className="text-left">
            {poke.moves.map((move,i) => (
                    <p  
                    key={i}
                    >
                     {move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "level-up" 
                     ? move.version_group_details[move.version_group_details.length - 1].level_learned_at : 
                     move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "machine" 
                     ? <text className="text-primary"> TM </text> :
                     move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "egg" ? 
                     <text className="text-success"> Egg Move </text>
                     : move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "tutor" ? 
                     <text className="text-danger"> Move Tutor </text> : "unknown"}
                    </p> 
               ))}
            
              
             </Col>
        </AccordionDetails>
      </Accordion>
    </div>
                </div>
                
            ))}

          </div>
        
            }</div>
    )
}

export default PokemonList