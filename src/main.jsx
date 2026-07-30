import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './context/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Protection from './component/auth_route.jsx'
import Login from './pages/login_.jsx'
import Sign_Up from './pages/Sign_up.jsx'
import My_Posts from './pages/all_post.jsx'
import Edit_Post from './pages/Edit_page.jsx'
import Post from './pages/post.jsx'
import Add_Post from './pages/add_post.jsx'
const router=createBrowserRouter([
{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
       element:<Home/>,
    },
    {
      path:'/login',
      element:(
        <Protection authenticated={false} >
        <Login/>
        </Protection>
      )
    },
    {
      path:'/signup',
      element:(
         <Protection authenticated={false} >
        <Sign_Up/>
        </Protection>
      )
    },
    {
      path:'/my-posts',
      element:(
        <Protection authenticated={true} >
          <My_Posts/>
        </Protection>
      )
    },
     {
      path:'/add-post',
      element:(
        <Protection authenticated={true} >
          <Add_Post/>
        </Protection>
      )
    },
    {
      path:'/edit-post/:id',
      element:(
        <Protection authenticated={true} >
         <Edit_Post/>
        </Protection>
      )
    },
    {
      path:'/post/:id',
      element:(
        <Protection authenticated={true}>
       <Post/>
       </Protection>
      )
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
  </Provider>
)
