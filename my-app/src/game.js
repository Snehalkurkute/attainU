import React, { useState, useEffect } from 'react';
import './game.css';
import Grid from './grid';

const Game = () => {
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [greens, setGreens] = useState([]);
  const [redPosition, setRedPosition] = useState([rowCount / 2, columnCount / 2]);

  const getInitialGreens = (rows, columns) => {
    const greenLocation = [];
    const randomNoOfGreens = getRandomInt(1, rows*columns)
    for (let greens = 0; greens < randomNoOfGreens; greens++) {
      const row = getRandomInt(0, rows);
      const col = getRandomInt(0, columns);
      greenLocation.push([row, col])
    }
    return greenLocation
  }

  useEffect(() => {
    const rowsByUser = parseInt(prompt("Please enter number of rows", "10"));
    const columnsByUser = parseInt(prompt("Please enter number of columns", "10"));
    setRowCount(rowsByUser);
    setColumnCount(columnsByUser);
    setRedPosition([Math.floor(rowsByUser/2), Math.floor(columnsByUser/2)])
    setGreens(getInitialGreens(rowsByUser, columnsByUser))

    document.getElementById('wrapper').focus()
  }, [])

  const getRandomInt = (min, max) => {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

  const handleOnKeyDown = ({ keyCode }) => {
    let newRed, newRow, newCol;
    switch (keyCode) {
      case 37:
        newCol = redPosition[1] - 1;
        if (newCol >= 0) {
          newRed = [redPosition[0], newCol]
        }
        break;
      case 38:
        newRow = redPosition[0] - 1;
        if (newRow >= 0) {
          newRed = [newRow, redPosition[1]]
        }
        break;
      case 39:
        newCol = redPosition[1] + 1;
        if (newCol <= columnCount - 1) {
          newRed = [redPosition[0], newCol]
        }
        break;
      case 40:
        newRow = redPosition[0] + 1;
        if (newRow <= rowCount - 1) {
          newRed = [newRow, redPosition[1]]
        }
        break;
      default:
        break;

    }

    if (newRed) {
      const newGreens = []
      greens.forEach((greenLocation) => {
        if(greenLocation[0] !== newRed[0] || greenLocation[1] !== newRed[1]){
          newGreens.push(greenLocation)
        }
      })
      setGreens(newGreens)
      setRedPosition(newRed)
    }

  }

  return (
    <div onKeyDown={handleOnKeyDown} id='wrapper' tabIndex="0">
      <Grid columnCount={columnCount}
            rowCount={rowCount}
            redPosition={redPosition}
            greens={greens}
      />
    </div>
  )

}


export { Game }