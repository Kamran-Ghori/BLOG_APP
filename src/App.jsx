import { useEffect, useState } from 'react';
import './App.css'
import { Outlet } from 'react-router-dom';
import data_base from "./appwrite/db";
import { useDispatch } from 'react-redux'; 
import { login,logout } from './context/auth';
import Footer from './component/Footer/footer';
import Header from './component/Header/header';
import authentication from './appwrite/auth';
function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch( );

  useEffect(() => {
    authentication.get_curr_user()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-50 text-slate-900 font-sans'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  }

export default App
