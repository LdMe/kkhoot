import { createBrowserRouter } from "react-router-dom";
import { getMyTrivias } from "./utils/api/trivia";
import Root from "./pages/root/Root";
import Auth from "./pages/auth/Auth";
import Mykkhoots from "./pages/mykkhoots/Mykkhoots";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {

                path: "/",
                element: <Auth />

            },
            {
                path:"/trivias",
                element: <Mykkhoots />,
                loader: getMyTrivias
            }
        ]
    }
])

export default router