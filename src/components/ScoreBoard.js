
const ScoreBoard = ({player1, player1Score, player2, player2Score}) => {
    return (
        <div className="score-board">
            <div className="player-panel">
                <div>
                    <div>Player 1: {player1}</div>
                    <div>Score: {player1Score}</div>
                </div>
            </div>
            <div className="player-panel">
                <div>
                    <div>Player 2: {player2}</div>
                    <div>Score: {player2Score}</div>
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard
