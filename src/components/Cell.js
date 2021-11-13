const Cell = ({data, onClick}) => {

    // let char = '';
    // if (data.val === 0){
    //     char = "x";
    // }
    // if (data.val === 2){
    //     char = "o";
    // }
    
    const dataToChar = (data)=>{
        switch(data){
            case 1:
                return 'x';
            case 2:
                return 'o';
            default:
                return ' ';
        }
    }

    return (
        <div 
            className={`board-cell ${data===0 ? ' board-cell-empty':''}`}
            onClick={onClick}
            >
           {dataToChar(data)}
        </div>
    )
}

export default Cell
