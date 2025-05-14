import { Link } from "react-router-dom"

const Home = () => {
    return (
        <section>
            <h1 >KKhoot</h1>
            <article className="trivia__card">
                <h2>Unirse a una partida</h2>
                <p>Únete a una partida mediante un código</p>
                <Link to="/join">
                    <button>
                        Unirse
                    </button>
                </Link>
            </article>
            <article className="trivia__card">
                <h2>Crear una partida</h2>
                <p>Regístrate o inicia sesión para poder crear una partida</p>

                <Link to="/login">
                    <button>
                        Iniciar Sesión
                    </button>
                </Link>
                <Link to="/register">
                    <button>
                        Registrarse
                    </button>
                </Link>
            </article>
        </section >

    )
}

export default Home