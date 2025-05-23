import { createBrowserRouter } from "react-router-dom";
import { getMyTrivias, getTriviaById} from "./utils/api/trivia";
import Root from "./pages/root/Root";
import Auth from "./pages/auth/Auth";
import Mykkhoots from "./pages/mykkhoots/Mykkhoots";
import Newkkhoot from "./pages/newkkhoot/Newkkhoot";
import Trivia from "./pages/trivia/Trivia";
import Lobby from "./pages/gameSession/lobby/Lobby";
import Join from "./pages/gameSession/join/Join";
import Home from "./pages/home/Home";
import { getGameSessionById } from "./utils/api/gameSession";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {

                path: "/",
                element: <Home />

            },
            {

                path: "/login",
                element: <Auth  isRegister={false}/>

            },
            {

                path: "/register",
                element: <Auth isRegister={true} />

            },
            {
                path:"/trivias",
                element: <Mykkhoots />,
                loader: getMyTrivias
            },
            {
                path:"/trivias/new",
                element: <Newkkhoot />
            },
            {
                path:"/trivias/:triviaId",
                element: <Trivia />,
                loader: ({params}) => getTriviaById(params.triviaId)
            },
            {
                path:"/sessions/:sessionId",
                element: <Lobby />,
                loader: ({params}) => getGameSessionById(params.sessionId)
            },
            {
                path:"/join",
                element: <Join />,
            },
            {
               path:"/join/:code",
               element: <Join />,
            }
        ]
    }
])

export default router