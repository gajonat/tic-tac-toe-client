
const LeaderBoard = ({highScoreData}) => {
    return (
        <div>
            <h2>Leader Board</h2>
            <div className="high-score-grid">
            {highScoreData.map((row, index)=>(
                <div className="high-score-row">
                    <div className="high-score-item">
                        {index+1}. {row.name}
                    </div>
                    <div className="high-score-item">
                        {row.score}
                    </div>
                </div>
            ))}

            </div>

        </div>
    )
}
export default LeaderBoard
