import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";
import SendMessage from "./components/SendMessage/SendMessage";
import NotFound from "./components/NotFound/NotFound";
import { useContext, useEffect } from "react";
import { TokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
function App() {
let{setToken}= useContext(TokenContext)
useEffect(()=>{
  if(localStorage.getItem("userToken")){
    setToken(localStorage.getItem("userToken"))
  }
},[])


  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {index:true, element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <LogIn /> },
        { path: "profile", element: <ProtectedRoutes><Profile /> </ProtectedRoutes>},
        { path: "message/:userId", element: <SendMessage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return(

    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;
