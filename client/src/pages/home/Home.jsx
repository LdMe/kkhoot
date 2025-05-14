import { Link } from "react-router-dom"

const Home = () => {
    return (
        <section>
            <h1 >KKhoot</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/join">Join a game</Link>
        </section>

    )
}

export default Home