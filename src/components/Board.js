import Cell from "./Cell"


const Board = ({grid, cellClicked, gridSize}) => {



    return (
        <div className="game-board" style={{gridTemplate: `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`}}>
        {grid.map((row, i) => {
          return (
            <>
              {row.map((cell, j) => {
                return (
                    <Cell 
                    key={`${j}:${i}`}
                    data={cell}
                    onClick={()=>{return cellClicked({x:i,y:j})} }
                    />
                );
              })}
            </>
          );
        })}
      </div>        
    )
}

export default Board
