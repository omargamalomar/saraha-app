import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Layout from './components/shared/layout/Layout';
import Home from './components/app/home/Home';
import RouteGuard from './components/guards/RouteGuard';
import LandingPage from './components/shared/landing/LandingPage';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import SendMessage from './components/app/sendMessage/SendMessage';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element: <LandingPage />},
    {path: 'register', element: <Register />},
    {path: 'login', element: <Login />},
    {path: 'home', element: <RouteGuard> 
        <QueryClientProvider client={queryClient}>
          <Home/> 
        </QueryClientProvider>
      </RouteGuard>
    },
    {path: 'sendmessage/:id', element: <SendMessage />}
  ]}
])

function App() {

  const {checkIfLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
