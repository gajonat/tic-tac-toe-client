import React from 'react'

const RestartPanel = ({onRestart}) => {
    return (
        <div>
            <button
                onClick={()=>{return onRestart()} }
                className="btn"
            >Restart</button>
        </div>
    )
}

export default RestartPanel
