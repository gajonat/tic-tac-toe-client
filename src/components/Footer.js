import { Link } from "react-router-dom"

const Footer = ({updateLeaders}) => {
    return (
        <div className="footer">
            <div>
                <Link to='/'>Game</Link>
            </div>
            <div>
                <Link to='/leaderBoard' onClick={updateLeaders}>Leader Board</Link>
            </div>
        </div>
    )
}
export default Footer
