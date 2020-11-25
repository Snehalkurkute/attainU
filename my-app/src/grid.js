import React from 'react';

const Grid = ({columnCount, rowCount, greens, redPosition}) => {

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
      if (row === redPosition[0] && column === redPosition[1]) {
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
    const rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push(<div className={'row'}>
        {getColumns(row)}
      </div>)
    }
    return rows;

}

export default Grid
