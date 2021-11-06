import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { PokemonContext } from '../Context/PokemonContext'
import { Button } from 'react-bootstrap';

const useRowStyles = makeStyles({
  root: {

    // borderBottom: '1px black solid'
    // '& > *': {
    //   borderBottom: 'unset',
    // },
  },
});

function Row({row}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      
      {/* {pokemon.map((poke,i) => ( */}
          <>

        <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        
        <TableCell component="th" scope="row">
          
          <img src={row.sprites.front_default} /> 
          {row.name}
        </TableCell>

        {row.stats.map((stat,i) => (
             <TableCell key={i} align="center">{stat.base_stat}</TableCell>
        ))}

        {/* <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>

        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Moves
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Move</TableCell>
                    <TableCell>Level Up</TableCell>
                    <TableCell align="right">TM</TableCell>
                    <TableCell align="right">Move Tutor</TableCell>
                    <TableCell align="right">Egg Move</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                    row.moves.map((move,i)=> (
                        <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {move.move.name}
                      </TableCell>
                      
                      <TableCell>{move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "level-up" ? move.version_group_details[move.version_group_details.length - 1].level_learned_at : ""}</TableCell>
                      <TableCell>{move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "machine" ? "TM" : ""}</TableCell>
                      <TableCell>{move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "tutor" ? "Move Tutor" : ""}</TableCell>
                      <TableCell>{move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === "egg" ? "Egg Move" : ""}</TableCell>

                      
                      </TableRow>
                    ))
                    }

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

          </>


{/* 
    //   ))
    //   } */}
      
    </React.Fragment>
  );
}






export default function PokemonTable() {

const {pokemon, setPokemon, offset, setOffset, limit, setLimit, getPokemon} = useContext(PokemonContext)

   async function next() {
       await setOffset(offset + 100)
       await setLimit(limit + 100)
       getPokemon()
       console.log(offset, limit)
   }

   async function back() {
    await setOffset(offset - 100)
    await setLimit(limit - 100)
    getPokemon()
    console.log(offset, limit)
}


  return (
    <TableContainer component={Paper}>
        <Button onClick={back}> Previous Page</Button>
        <Button onClick={next}> Next Page</Button>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Description</TableCell>
            <TableCell align="right">Hp</TableCell>
            <TableCell align="right">Attack</TableCell>
            <TableCell align="right">Defense</TableCell>
            <TableCell align="right">Special Attack</TableCell>
            <TableCell align="right">Special Defense</TableCell>
            <TableCell align="right">Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        {pokemon.map((row,i) => (
            <Row key={i} row={row} />
          ))}
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}