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

      console.log(`directed to the home page`);
      
      const [loading, setLoading] = useState(true)
      const dispatch = useDispatch( );

      useEffect(() => {
        authentication.get_curr_user()
        .then((userData) => {
          if (userData) {
            console.log(`The user is Created sucessfully`);
                    console.log(userData);
            dispatch(login(userData))
            setLoading(false);
          } else {
            dispatch(logout())
            setLoading(false);
          }
        })
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
