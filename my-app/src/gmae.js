import React, { useState, useEffect } from 'react';
import './game.css';

const Game = () => {

  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [greens, setGreens] = useState([]);
  const [red, setRed] = useState([rowCount / 2, columnCount / 2]);

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
    setRed([Math.floor(rowsByUser/2), Math.floor(columnsByUser/2)])
    setGreens(getInitialGreens(rowsByUser, columnsByUser))

    document.getElementById('wrapper').focus()
  }, [])

  const getRandomInt = (min, max) => {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }


  const getColumns = (row) => {
    const columns = [];
    for (let column = 0; column < columnCount; column++) {
      let isGreen = false;
      greens.forEach((greenLocation) => {
        if (greenLocation[0] === row && greenLocation[1] === column) {
          isGreen = true;
        }
      })
      let redOrGreen;
      let className ='';
      if (isGreen) {
        className += ' green';
      }
      if (row === red[0] && column === red[1]) {
        className += ' red'
      }
      if(className) {
        redOrGreen = <div className={className}/>
      }
      columns.push(
        <div className='column'>
          {redOrGreen}
        </div>
      )
    }
    return columns
  }

  const getGrid = () => {
    const rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push(<div className={'row'}>
        {getColumns(row)}
      </div>)
    }
    return rows;
  }

  const handleOnKeyDown = ({ keyCode }) => {
    let newRed, newRow, newCol;
    switch (keyCode) {
      case 37:
        newCol = red[1] - 1;
        if (newCol >= 0) {
          newRed = [red[0], newCol]
        }
        break;
      case 38:
        newRow = red[0] - 1;
        if (newRow >= 0) {
          newRed = [newRow, red[1]]
        }
        break;
      case 39:
        newCol = red[1] + 1;
        if (newCol <= columnCount - 1) {
          newRed = [red[0], newCol]
        }
        break;
      case 40:
        newRow = red[0] + 1;
        if (newRow <= rowCount - 1) {
          newRed = [newRow, red[1]]
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
      setRed(newRed)
    }

  }

  return (
    <div onKeyDown={handleOnKeyDown} id='wrapper' tabIndex="0">
      {getGrid()}
    </div>
  )

}


export { Game }