import React, { useState, useEffect } from 'react';
import './game.css';

const rowCount = 10;
const columnCount = 10;

const Game = () => {
  useEffect(() => {
    document.getElementById('wrapper').focus()
  }, [])

  const getInitialGreens = () => {
    const greenLocation = [];
    for (let greens = 0; greens < 10; greens++) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      greenLocation.push([row, col])
    }
    return greenLocation
  }
  const [greens, setGreens] = useState(getInitialGreens());
  const [red, setRed] = useState([rowCount / 10, columnCount / 10]);


  const getColumns = (row) => {
    const columns = [];
    // const greens = getGreens();
    for (let column = 0; column < columnCount; column++) {
      let isGreen = false;
      greens.forEach((greenLocation) => {
        if (greenLocation[0] === row && greenLocation[1] === column) {
          isGreen = true;
        }
      })
      let redOrGreen;
      let className;
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
        if (newCol <= columnCount) {
          newRed = [red[0], newCol]
        }
        break;
      case 40:
        newRow = red[0] + 1;
        if (newRow <= rowCount) {
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