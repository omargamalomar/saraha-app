import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {index:true, element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <LogIn /> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return(

    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;
